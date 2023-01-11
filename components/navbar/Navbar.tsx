"use client"
import  {Navbar, Group, Code, ScrollArea, createStyles } from "../components";
import {  TablerIcon,
} from "@tabler/icons";
import Logo from './Logo';
import {LinksGroup} from "./NavbarLinksGroup";
import {UserButton } from "./UserButton";
import DemoNavSchema from "../../demo/DemoNavSchema";
import React from "react";

export interface mockdata{
  label : String;
 icon : TablerIcon;
 initiallyopened: boolean
 links: Array<{}| {} | {}>;
}
const useStyles = createStyles((theme)=>({
  navbar:{
    backgroundColor:theme.colorScheme === 'dark'?theme.colors.dark[6]:theme.white,
  paddingBotton:0,},
  header:{
    padding:theme.spacing.md,
    paddingTop:0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme==='dark'?theme.white:theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme==='dark'?theme.colors.dark[4]:theme.colors.gray[3]
    }`,},
    links:{
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },
    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom:theme.spacing.md,
    },
    footer: {
    marginLeft: -theme.spacing.md,
    marginRight:-theme.spacing.md,
    borderTop:`1px solid ${theme.colorScheme==='dark'?theme.colors.dark[4]:theme.colors.gray[3]}`,
    },

}));


export function NavbarNested({children}: {children: React.ReactNode}) {
  const {classes} = useStyles();
  const links = DemoNavSchema.map((item)=><LinksGroup  {...item} key={item.label}/>);
  return (
    <div className="flex-row">
    <Navbar className="h-[100vh]" p="xs" width={{ base: 300 }}>
      <Navbar.Section className={classes.header}>{/* Header with logo */}
      <Group position="apart">
          <Logo />
          <Code sx={{fontWeight : 500,background:"white",fontSize:15}}>Portal@IIT-BHU</Code>
          <Code sx={{fontWeight : 700}}>v3.1.2</Code>
        </Group>
      </Navbar.Section>
      <Navbar.Section  grow className={classes.links} component={ScrollArea}>{/* Links sections */}
      <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>{/* Footer with user */}
      <UserButton
        image="https://img.collegepravesh.com/2015/09/IIT-BHU-Logo.png"
          name="TPC IIT-BHU"
          email="tpo@iitbhu.ac.in"
        />
      </Navbar.Section>
    </Navbar>
    <div className="flex">
      {children}
    </div>
    </div>
  );
}