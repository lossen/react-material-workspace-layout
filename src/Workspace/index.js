import React from "react"
import { styled } from "@material-ui/core/styles"
import Header from "../Header"
import IconSidebar from "../IconSidebar"
import RightSidebar from "../RightSidebar"
import WorkContainer from "../WorkContainer"
import useDimensions from "react-use-dimensions"
import { IconDictionaryContext } from "../icon-dictionary.js"

const emptyAr = []
const emptyObj = {}

const Container = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  maxWidth: "100vw",
})
const SidebarsAndContent = styled("div")({
  display: "flex",
  flexGrow: 1,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  maxWidth: "100vw",
})

export default ({
  style = emptyObj,
  iconSidebarItems = emptyAr,
  selectedTools = ["select"],
  headerItems = emptyAr,
  rightSidebarItems = emptyAr,
  onClickHeaderItem,
  onClickIconSidebarItem,
  headerLeftSide = null,
  iconDictionary = emptyObj,
  children,
  IconSidebarBgColor
}) => {
  const [workContainerRef, workContainerSize] = useDimensions()
  return (
    <IconDictionaryContext.Provider value={iconDictionary}>
      <Container style={style}>
        <Header
          leftSideContent={headerLeftSide}
          onClickItem={onClickHeaderItem}
          items={headerItems}
        />
        <SidebarsAndContent>
          {iconSidebarItems.length === 0 ? null : (
            <IconSidebar
              onClickItem={onClickIconSidebarItem}
              selectedTools={selectedTools}
              items={iconSidebarItems}
              bgColor={IconSidebarBgColor}
            />
          )}
          <WorkContainer ref={workContainerRef}>{children}</WorkContainer>
          {rightSidebarItems.length === 0 ? null : (
            <RightSidebar height={workContainerSize.height || 0}>
              {rightSidebarItems}
            </RightSidebar>
          )}
        </SidebarsAndContent>
      </Container>
    </IconDictionaryContext.Provider>
  )
}
