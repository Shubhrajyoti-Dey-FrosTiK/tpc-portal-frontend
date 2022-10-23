import { Tooltip } from "@material-tailwind/react";
import { AccordionHeader, Typography } from "@material-tailwind/react";

// Library
import React from "react";
import { useState } from "react";

// Constants
import { COLOR } from "../../constants/colors";

// Components
import AddIcon from "../../assets/icons/AddIcon.jsx";
import MinusIcon from "../../assets/icons/MinusIcon.jsx";
import { Fragment } from "react/cjs/react.production.min";

function ListRenderer({ list }) {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div>
      {list.map((listItem, index) => {
        if (listItem.subOptions.length)
          return (
            <div className="mt-2 mb-2" key={`NavOption_${Math.random()}`}>
              <div className="font-medium">
                <a
                  className="hs-collapse-toggle inline-flex items-center gap-x-2 text-blue-600 w-full"
                  id={`hs-show-hide-collapse-${Math.random()}`}
                  data-hs-collapse="#hs-show-hide-collapse-heading"
                >
                  <span className="hs-collapse-open:hidden text-black flex justify-between w-full">
                    <Typography className="font-medium cursor-pointer">
                      {listItem.label}
                    </Typography>
                  </span>
                  <span className="hs-collapse-open:block hidden text-black w-full cursor-pointer">
                    {listItem.label}
                  </span>
                  <AddIcon
                    style={{ color: COLOR.TEXT_RGB }}
                    className="cursor-pointer hs-collapse-open:hidden"
                  />
                  <MinusIcon
                    style={{ display: "none", color: COLOR.TEXT_RGB }}
                    className="cursor-pointer hs-collapse-open:block "
                  />
                  {/* <AddIcon
                    
                  />
                  <Add
                  <RemoveIcon
                    sx={{ display: "none", color: COLOR.TEXT_RGB }}
                    className="cursor-pointer hs-collapse-open:block"
                  /> */}
                </a>
              </div>
              <div
                id="hs-show-hide-collapse-heading"
                className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300 ml-2"
                aria-labelledby="hs-show-hide-collapse"
              >
                <ListRenderer list={listItem.subOptions} />
              </div>
            </div>
          );
        else
          return (
            <Fragment key={`NavOption_${Math.random()}`}>
              <Tooltip
                content="Material Tailwind"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                placement="right"
              >
                <Typography className="font-medium cursor-pointer">
                  {listItem.label}
                </Typography>
              </Tooltip>
            </Fragment>
          );
      })}
    </div>
  );
}

export default ListRenderer;
