import { SupabaseClient } from '@supabase/supabase-js'
import { ServiceError } from '../lib/service-error'
import type { Database } from '../database.types'

import { type FileUpload, type UUID } from '@bluelearn/schemas'

type DB = SupabaseClient<Database>

export function fileNameCleaner(name: string) {
  // Clean file names before upload
  name = name.replaceAll(' ', '-')                 // Replace spaces with en dashes
  name = name.replaceAll(/[^a-zA-Z0-9_\-\.]/g, '') // Remove special characters
  return name
}

export async function uploadMediaFile(file: FileUpload, userId: string, db: DB) {
  // Uploads media file to bucket and store path in database
  const cleanFileName = fileNameCleaner(file.name)

  // Upload to storage
  const { data: uploadData, error: uploadError } = await db.storage
    .from('media')
    .upload(`uploads/${Date.now()}_${cleanFileName}`, file)

  if (uploadError) {
    console.error(uploadError)
    throw new ServiceError('File upload failed', 500)
  }

  // Insert path of uploadData into database
  const { data: databaseEntry, error: databaseError } = await db
    .from('media_assets')
    .insert({
      storage_key: uploadData.path,
      uploaded_by: userId,
    })
    .select()
    .single()

  if (databaseError) {
    console.error('media_assets insert failed:', databaseError.message)
    throw new ServiceError('Failed to store file metadata in database', 500)
  }

  return databaseEntry
}

export async function addMediaRevision(revision_id: UUID, asset_id: UUID, db: DB) {
  // Create a new revision entry for a media asset

  // Check guide_revisions.id and media_assets.id exist
  const [{ data: revision, error: revisionFound }, { data: asset, error: assetFound }] = await Promise.all([
    db.from('guide_revisions').select('id').eq('id', revision_id),
    db.from('media_assets').select('id').eq('id', asset_id)
  ])

  if (!revisionFound) {
    console.error('revision_id not found in guide_revisions')
    throw new ServiceError('Guide revision ID not found', 500)
  }
  if (!assetFound) {
    console.error('asset_id not found in media_assets')
    throw new ServiceError('Asset ID not found', 500)
  }

  const { data: revisionEntry, error: revisionError } = await db
    .from('media_assets_revision')
    .insert({
      revision_id: revision_id,
      asset_id: asset_id  
    })
    .select()
    .single()
  
  if (revisionError) {
    if (revisionError.code == '23503') {
      console.error(revisionError)
      throw new ServiceError('Internal server error', 500)
    }

    console.error('media_assets_revisions insert failed:', revisionError.message)
    throw new ServiceError('Failed to create media revision entry', 500)
  }

  return revisionEntry
}
