import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  Linking,
} from "react-native";
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from "../../../../theme";

const { height, width } = Dimensions.get("screen");

const News = ({ urlImage, titleNews, newsResume, linkTitle, link }) => {
  const imgNews = { uri: urlImage };
  // eslint-disable-next-line no-underscore-dangle
  const _handleOpenWithLinking = () => {
    Linking.openURL(link);
  };
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={imgNews} />
      <View
        style={{
          width: "45%",
          height: "90%",
          // borderWidth: 1,
          // paddingVertical: SCREEN_HEIGHT * 0.01,
          justifyContent: "space-between",
        }}
      >
        <View>
          {titleNews && (
            <Text
              style={{
                width: "95%",
                color: COLORS.secondary,
                fontSize: FONT_SIZE.normal,
                fontWeight: "700",
                marginHorizontal: SCREEN_HEIGHT * 0.009,
              }}
              numberOfLines={3}
            >
              {titleNews}
            </Text>
          )}
          {newsResume && (
            <Text
              style={{
                width: "90%",
                color: COLORS.secondary,
                fontSize: SCREEN_HEIGHT * 0.009,
                marginHorizontal: SCREEN_HEIGHT * 0.01,
              }}
              numberOfLines={2}
            >
              {newsResume}
            </Text>
          )}
        </View>
        {linkTitle && (
          <TouchableHighlight
            onPress={_handleOpenWithLinking}
            underlayColor="#936abd"
            style={{
              backgroundColor: COLORS.primary,

              alignItems: "flex-end",
              paddingRight: SCREEN_HEIGHT * 0.01,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "700",
                fontSize: SCREEN_HEIGHT * 0.015,
              }}
            >
              Mas información
            </Text>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    width: width * 0.85,
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 4,
    marginTop: height * 0.033,
    marginHorizontal: width * 0.08,
    height: height * 0.2,
  },
  imageStyle: {
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    marginLeft: SCREEN_HEIGHT * 0.009,
    height: "90%",
    width: "50%",
    resizeMode: "cover",
  },
  textContainer: {
    // marginHorizontal: 18,
    // marginBottom: 15,
    // marginTop: 10,
  },
  title: {
    fontSize: height * 0.025,
    fontWeight: "700",
  },
  resume: {
    fontSize: height * 0.014,
    fontWeight: "500",
  },
  textTerms: {
    fontSize: height * 0.014,
    fontWeight: "700",
    // textDecorationLine: "underline",
  },
});

export default News;
