import { defineStepper } from "@stepperize/react";
import { ChevronRight } from "lucide-react";
import { Fragment, useMemo, useState } from "react";

import type { Dispatch, SetStateAction } from "react";

import type {
  ContributionType,
  GuideContribution,
  ObjectiveContribution,
} from "@/types/contributions";

import { SelectType } from "@/components/contribute/steps/SelectType";
import { GuideDetails } from "@/components/contribute/steps/GuideDetails";
import { VariantDetails } from "@/components/contribute/steps/VariantDetails";
import { Content } from "@/components/contribute/steps/Content";
import { ObjectiveDetails } from "@/components/contribute/steps/ObjectiveDetails";
import { Submit } from "@/components/contribute/steps/Submit";
import { OrderObjectiveGuides } from "@/components/contribute/steps/OrderObjectiveGuides";

import { flows, typeStep } from "@/lib/contributionFlow";

type PropTypes = {
  type: ContributionType | null;
  setType: (value: ContributionType) => void;
};

export default function ContributionFlow({ type, setType }: PropTypes) {
  const [guideContData, setGuideContData] = useState<GuideContribution>({
    type: "",
    title: "",
    summary: "",
    subjects: [],
    newSubjects: [],
    prereqs: [],
    todoPrereqs: [],
  });

  const [objectiveContData, setObjectiveContData] =
    useState<ObjectiveContribution>({
      title: "",
      summary: "",
      targets: [
        "arithmetic-introduction",
        "algebra-how-to-express-equations",
        "calculus-introduction",
        "vectors-introduction",
        "mechanics-how-to-apply-newtons-laws",
      ],
      featured: "",
      subObjectives: [],
    });

  const StepperInstance = useMemo(() => {
    if (!type) {
      return defineStepper(typeStep);
    }

    return defineStepper([...typeStep, ...flows[type]]);
  }, [type]);

  const { Stepper } = StepperInstance;

  return (
    <Stepper.Root
      linear
      className="flex min-h-[calc(100vh_-_210px)] w-full flex-col gap-8"
    >
      {({ stepper }: any) => (
        <Inner
          Stepper={Stepper}
          stepper={stepper}
          type={type}
          setType={setType}
          guideContData={guideContData}
          setGuideContData={setGuideContData}
          objectiveContData={objectiveContData}
          setObjectiveContData={setObjectiveContData}
        />
      )}
    </Stepper.Root>
  );
}

function Inner({
  Stepper,
  stepper,
  type,
  setType,
  guideContData,
  setGuideContData,
  objectiveContData,
  setObjectiveContData,
}: {
  Stepper: any;
  stepper: any;
  type: ContributionType | null;
  setType: (value: ContributionType) => void;

  guideContData: GuideContribution;
  setGuideContData: Dispatch<SetStateAction<GuideContribution>>;

  objectiveContData: ObjectiveContribution;
  setObjectiveContData: Dispatch<SetStateAction<ObjectiveContribution>>;
}) {
  const pickType = (value: ContributionType) => {
    setType(value);

    requestAnimationFrame(() => {
      switch (value) {
        case "guide":
          stepper.goTo("guide-details");
          break;

        case "variant":
          stepper.goTo("variant-details");
          break;

        default:
          stepper.goTo("objective-details");
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-210px)] w-full gap-8">
      {/* sidebar */}
      <div className="w-64 border-r pr-4">
        <Stepper.List>
          <Stepper.Items>
            {(step: any, index: number) => (
              <Stepper.Item
                key={step.id}
                step={step.id}
                className="flex items-center gap-2 py-2"
              >
                <Stepper.Indicator className="grid size-8 place-items-center rounded-full border bg-badge text-xl">
                  {index + 1}
                </Stepper.Indicator>

                <Stepper.Title />
    <>
      {/* horizontal breadcrumb stepper */}
      <Stepper.List className="flex w-full items-center justify-center text-sm">
        <Stepper.Items>
          {(step: any, index: number) => (
            <Fragment key={step.id}>
              {index > 0 && (
                <ChevronRight className="mx-1 size-4 text-muted-foreground/50" />
              )}

              <Stepper.Item step={step.id}>
                <Stepper.Trigger className="rounded-md p-2 font-mono text-[12px] text-muted-foreground uppercase transition-colors hover:bg-muted data-[status=active]:font-bold data-[status=active]:text-brand-blue data-[status=previous]:text-foreground">
                  <Stepper.Title />
                </Stepper.Trigger>
              </Stepper.Item>
            </Fragment>
          )}
        </Stepper.Items>
      </Stepper.List>

      {/* content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <SelectType pickType={pickType} type={type} Stepper={Stepper} />

        <GuideDetails
          Stepper={Stepper}
          guideContData={guideContData}
          setGuideContData={setGuideContData}
        />

        <VariantDetails Stepper={Stepper} />

        <ObjectiveDetails
          Stepper={Stepper}
          objectiveContData={objectiveContData}
          setObjectiveContData={setObjectiveContData}
        />

        <Content Stepper={Stepper} />
        <OrderObjectiveGuides
          Stepper={Stepper}
          objectiveContData={objectiveContData}
          setObjectiveContData={setObjectiveContData}
        />

        <Submit Stepper={Stepper} />
      <div className="flex-1">
        <Stepper.Content step="type">
          <SelectType pickType={pickType} type={type} Stepper={Stepper} />
        </Stepper.Content>

        <Stepper.Content step="guide-details">
          <GuideDetails
            Stepper={Stepper}
            guideContData={guideContData}
            setGuideContData={setGuideContData}
          />
        </Stepper.Content>

        <Stepper.Content step="variant-details">
          <VariantDetails Stepper={Stepper} />
        </Stepper.Content>

        <Stepper.Content step="objective-details">
          <ObjectiveDetails
            Stepper={Stepper}
            objectiveContData={objectiveContData}
            setObjectiveContData={setObjectiveContData}
          />
        </Stepper.Content>

        <Stepper.Content step="content">
          <Content Stepper={Stepper} />
        </Stepper.Content>

        <Stepper.Content step="objective-ordering">
          <OrderObjectiveGuides Stepper={Stepper} />
        </Stepper.Content>

        <Stepper.Content step="submit">
          <Submit Stepper={Stepper} />
        </Stepper.Content>
      </div>
    </>
  );
}
