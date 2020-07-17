import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
    const {openCreateForm} = useContext(ActivityStore);

    return (
        <div>
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item header>
                        <img
                            src="/assets/logo.png"
                            alt="logo"
                            style={{ marginRight: "10px" }}
                        />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name="Activities" />
                    <Menu.Item>
                        <Button
                            onClick={openCreateForm}
                            positive
                            content="Create Activity"
                        />
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    );
};

export default observer(NavBar);
