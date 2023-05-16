"use client";

import { Icon123, Icon24Hours, Icon2fa } from "@tabler/icons";
import { Sidebar, SidebarElementType } from "../types/Sidebar.types";

const DemoNavSchema: Sidebar = {
  elements: [
    {
      type: SidebarElementType.ELEMENT,
      label: "Home",
      key: "home",
      linkTo: true,
      icon:Icon123,
    },
    {
      type: SidebarElementType.NESTED,
      label: "Forum",
      key: "forum",
      linkTo:false,
      icon:Icon24Hours,
      nested: [
        {
          type: SidebarElementType.ELEMENT,
          label: "Internship",
          key: "internship",
          linkTo: true,
        },
        {
          type: SidebarElementType.NESTED,
          label: "FT",
          key: "ft",
          linkTo: true,
          icon:Icon2fa,
          nested: [
            {
              type: SidebarElementType.ELEMENT,
              label: "Offers",
              key: "offers",
              linkTo: false,
            },
          ],
        },
      ],
    },
  ],
};
export default DemoNavSchema;
