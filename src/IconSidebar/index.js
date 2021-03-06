import React from "react"
import { styled } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import { iconMapping } from "../icon-mapping.js"
import { useIconDictionary } from "../icon-dictionary"
import Tooltip from "@material-ui/core/Tooltip"



type Props = {
  items: Array<{|
    name: string,
    helperText: string,
    icon?: ?React.Node,
    onClick: Function,
  |}>,
}

const emptyAr = []

export const IconSidebar = ({
  items = emptyAr,
  onClickItem,
  selectedTools = emptyAr,
  bgColor
}: Props) => {
  const customIconMapping = useIconDictionary()
  return (
    <div className="icon-sidebar-wrapper"
        style={{width: 50,
      height: "auto",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,}}
    >
      {items.map((item) => {
        let NameIcon =
          customIconMapping[item.name.toLowerCase()] ||
          iconMapping[item.name.toLowerCase()] ||
          iconMapping["help"]

        const buttonPart = (
          <IconButton
            key={item.name}
            color={
              item.selected || selectedTools.includes(item.name.toLowerCase())
                ? "primary"
                : "default"
            }
            disabled={Boolean(item.disabled)}
            onClick={item.onClick ? item.onClick : () => onClickItem(item)}
          >
            {item.icon || <NameIcon />}
          </IconButton>
        )

        if (!item.helperText) return buttonPart

        return (
          <Tooltip key={item.name} title={item.helperText} placement="right">
            {buttonPart}
          </Tooltip>
        )
      })}
    </div>
  )
}

export default IconSidebar
