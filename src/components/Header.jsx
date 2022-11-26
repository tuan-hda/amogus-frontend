import React, { useContext } from "react";
import { Navbar, Button, Text, Input, User, Dropdown } from "@nextui-org/react";
import { SearchIcon } from "../assets/SearchIcon";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import UserContext from "../utils/UserProvider";
import { auth } from "../firebase";

const Header = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  return (
    <div className='sticky top-0 z-10'>
      <Navbar isBordered={false} variant='sticky'>
        <Navbar.Brand>
          <Link to='/' className='flex items-center'>
            <img src={logo} alt='Logo' className='w-10 mr-6' />
            <Text b hideIn='xs'>
              GREENSUS
            </Text>
          </Link>
        </Navbar.Brand>

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
              aria-label='search'
              contentLeft={<SearchIcon fill='var(--nextui-colors-accents6)' size={16} />}
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
              placeholder='Tìm kiếm...'
            />
          </Navbar.Item>
          {/* <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
          </Dropdown> */}
          <Navbar.Content>
            {user ? (
              <Dropdown placement='bottom-right'>
                <Dropdown.Trigger>
                  <User src={user.photoURL} name={user.name} />
                </Dropdown.Trigger>
                <Dropdown.Menu aria-label='Static Actions'>
                  <Dropdown.Item key='profile'>
                    <p className='min-w-full' onClick={() => navigate("/profile")}>
                      Cá nhân
                    </p>
                  </Dropdown.Item>
                  <Dropdown.Item key='logout' color='error'>
                    <p
                      className='min-w-full'
                      onClick={() =>
                        signOut(auth).then(() => {
                          window.location.href = window.location.origin + "/";
                          setUser(undefined);
                        })
                      }
                    >
                      Đăng xuất
                    </p>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Link to='/login'>Đăng nhập</Link>
                <Navbar.Item>
                  <Button auto flat as={Link} color={"success"} onClick={() => navigate("/signup")}>
                    Đăng ký
                  </Button>
                </Navbar.Item>
              </>
            )}
          </Navbar.Content>
        </Navbar.Content>
      </Navbar>
    </div>
  );
};

export default Header;
