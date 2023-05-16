import { TablerIcon } from "@tabler/icons";

export enum SidebarElementType {
  "ELEMENT" = "ELEMENT",
  "NESTED" = "NESTED",
}

export interface SidebarElement {
  label: string;
  linkTo: boolean;
  key: string;
  type: SidebarElementType.ELEMENT;
  icon?:TablerIcon;
}
export interface SidebarNested {
  label: string;
  key: string;
  nested: Array<SidebarElement | SidebarNested>;
  type: SidebarElementType.NESTED;
  linkTo?: boolean;
  icon?: TablerIcon;
}

export interface Sidebar {
  elements: Array<SidebarElement | SidebarNested>;
}


