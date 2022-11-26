import React, { useState } from "react";
import {
  Navbar,
  Button,
  Link,
  Text,
  Avatar,
  Dropdown,
  Input,
  useTheme,
} from "@nextui-org/react";
import { SearchIcon } from "../assets/SearchIcon";
import logo from "../assets/logo.png";

const navItems = [
  {
    key: "1",
    title: "Tiêu đề",
    href: "#",
  },
  {
    key: "2",
    title: "Tiêu đề",
    href: "#",
  },
  {
    key: "3",
    title: "Tiêu đề",
    href: "#",
  },
  {
    key: "4",
    title: "Tiêu đề",
    href: "#",
  },
];

const Header = () => {
  const [currNav, setNav] = useState("1");
  const currentUser = true;

  const handleNavClick = (key) => {
    setNav(key);
  };

  return (
    <div>
      <Navbar isBordered={false} variant="sticky">
        <Navbar.Brand>
          <Link href="/">
            <img src={logo} alt="Logo" className="w-10 mr-6" />
            <Text b hideIn="xs">
              GREENSUS
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor={"success"}
          hideIn="xs"
          variant={"default"}
        >
          {navItems.map((nav, i) => (
            <Navbar.Link
              onClick={() => handleNavClick(nav.key)}
              href={nav.href}
              isActive={currNav === nav.key}
            >
              {nav.title}
            </Navbar.Link>
          ))}
        </Navbar.Content>

        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
            />
          </Navbar.Item>
          {currentUser ? (
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="success"
                    size="md"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="success"
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key="info" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Đã đăng nhập với
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    zoey@example.com
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="profile" withDivider>
                  Hồ sơ cá nhân
                </Dropdown.Item>
                {/* <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                <Dropdown.Item key="analytics" withDivider>
                  Analytics
                </Dropdown.Item>
                <Dropdown.Item key="system">System</Dropdown.Item>
                <Dropdown.Item key="configurations">
                  Configurations
                </Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Help & Feedback
                </Dropdown.Item> */}
                <Dropdown.Item key="logout" withDivider color="error">
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Navbar.Content>
              <Navbar.Link color="inherit" href="/login">
                Login
              </Navbar.Link>
              <Navbar.Item>
                <Button auto flat as={Link} color={"success"} href="/signup">
                  Sign Up
                </Button>
              </Navbar.Item>
            </Navbar.Content>
          )}
        </Navbar.Content>
      </Navbar>
    </div>
  );
};

export default Header;
