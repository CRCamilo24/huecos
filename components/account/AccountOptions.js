import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";

import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { COLORS, SCREEN_HEIGHT } from "../../theme";

export default function AccountOptions({ user, toastRef, setRelodUser }) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const generateOptions = () => {
    return [
      {
        title: "Cambiar Nombres y Apellidos",
        iconNameLeft: "account-circle",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Cambiar Email",
        iconNameLeft: "at",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("email"),
      },
      {
        title: "Cambiar Contraseña",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("password"),
      },
    ];
  };

  const selectedComponent = (key) => {
    console.log(key);
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={user.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setRelodUser={setRelodUser}
          />
        );
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={user.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setRelodUser={setRelodUser}
          />
        );
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm setShowModal={setShowModal} toastRef={toastRef} />
        );
        break;
    }
    setShowModal(true);
  };

  const menuOptions = generateOptions();

  return (
    <View style={{ marginHorizontal: SCREEN_HEIGHT * 0.03 }}>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          style={[
            styles.menuItem,
            { borderColor: COLORS.secondary, backgroundColor: "transparent" },
          ]}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          onPress={menu.onPress}
          underlayColor={COLORS.gray}
        >
          <Icon
            type="material-community"
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{ color: COLORS.secondary, fontWeight: "700" }}
            >
              {menu.title}
            </ListItem.Title>
          </ListItem.Content>
          <Icon
            type="material-community"
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
      <Modal isVisible={showModal} setVisible={setShowModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    // borderBottomColor: "#a7bfd3",
  },
});
