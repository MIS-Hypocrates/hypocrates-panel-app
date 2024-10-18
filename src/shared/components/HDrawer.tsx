'use client'

import {
    Box, Collapse,
    CSSObject,
    Drawer as MuiDrawer,
    List, ListItemButton, ListItemIcon, ListItemText,
    styled,
    Theme, useTheme
} from "@mui/material";
import {createContext, FC, PropsWithChildren, useCallback, useContext, useState} from "react";
import {AssignmentInd, ExpandLess, ExpandMore, LibraryBooks, People} from "@mui/icons-material";
import Link from "next/link";
import {useMediaQuery} from "@mui/system";

export interface HDrawerProps {
    visible: boolean;
    toggleVisible: () => void;
}

const DrawerContext = createContext<{ isOpen: boolean, open: () => void }>({ isOpen: false, open: () => {} });

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop  !== 'open' })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            },
        },
    ]
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface ItemProps {
    Icon?: FC;
    title: string;
}

const RootItemCollapse = ({ children, Icon, title }: PropsWithChildren<ItemProps>) =>   {
    const [open, setOpen] = useState(false);
    const drawledContext = useContext(DrawerContext);
    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const onPress = useCallback(() => {
        if (!open) drawledContext.open();
        setOpen(!open);
    }, [open, drawledContext]);

    let collapseOpen = open;

    if (isSm) {
        collapseOpen &&= drawledContext.isOpen
    }

    return (
        <>
            <ListItemButton onClick={onPress}>
                {
                    !!Icon && (
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                    )
                }
                <ListItemText primary={title} />
                {collapseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </>
    )
}

const SubRootItem = ({ href, Icon, title }: ItemProps & { href: string }) => (
    <Link href={href}>
        <ListItemButton>
            {
                !!Icon && (
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                )
            }
            <ListItemText primary={title} />
        </ListItemButton>
    </Link>
)

export const HDrawer = ({ visible, toggleVisible }: HDrawerProps) =>{
   const drawer = (
       <List>
           <RootItemCollapse Icon={LibraryBooks} title={"Справочники"}>
               <SubRootItem title={"Пациенты"} href={"/references/clients"} />
               <SubRootItem Icon={People} title={"Сотрудники"} href={"/references/employee"} />
           </RootItemCollapse>
           <SubRootItem Icon={AssignmentInd} title={"Права доступа"} href={"/role"} />
       </List>
   )

    const open = useCallback(() => {
        if (!visible) toggleVisible()
    }, [visible, toggleVisible])

    return (
        <Box component={"nav"} sx={{ flexShrink: { sm: 0 }  }}>
            <DrawerContext.Provider value={{ open, isOpen: visible }}>
                <Drawer
                    open={visible}
                    onClose={toggleVisible}
                    variant={"permanent"}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box' }
                    }}
                >
                    <DrawerHeader />
                    <Box sx={{ textAlign: 'center', minHeight: 64 }}>
                        {drawer}
                    </Box>
                </Drawer>
            </DrawerContext.Provider>
            <MuiDrawer
                variant="temporary"
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open={visible}
                onClose={toggleVisible}
            >
                <DrawerHeader />
                {drawer}
            </MuiDrawer>
        </Box>
    )
}

HDrawer.displayName = "HDrawer"