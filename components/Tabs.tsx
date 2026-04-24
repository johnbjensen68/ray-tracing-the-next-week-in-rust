import { Tab as NextraTab, Tabs as NextraTabs } from "nextra-theme-docs";
import {
  Children,
  ReactElement,
  ReactNode,
  isValidElement,
  useRef,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useScrollCompensation } from "../hooks/useScrollCompensation";

const extractChildrenLabels = (children: ReactNode) => {
  return Children.toArray(children)
    .filter((child) => isValidElement(child) && child.props.label)
    .map((child) => (child as ReactElement).props.label);
};

type Props = {
  labels?: string[];
  storageKey?: string;
  children?: ReactNode;
};

export function Tabs({
  labels,
  storageKey = "tab.lang",
  children = null,
}: Props) {
  const lbs = labels ?? extractChildrenLabels(children);

  const [activeTabLabel, saveActiveTabLabel] = useLocalStorage(
    storageKey,
    lbs[0],
  );

  let activeTabIdx = lbs.indexOf(activeTabLabel);
  if (activeTabIdx === -1) {
    activeTabIdx = 0;
  }

  const pinElementToViewport = useScrollCompensation();
  const pinElementRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pinElementRef}>
      <NextraTabs
        items={lbs}
        selectedIndex={activeTabIdx}
        onChange={(index) => {
          pinElementToViewport(pinElementRef.current!);
          saveActiveTabLabel(lbs[index]);
        }}
      >
        {children}
      </NextraTabs>
    </div>
  );
}

export { NextraTab as Tab };
