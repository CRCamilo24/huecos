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

const { height, width } = Dimensions.get("screen");

const News = ({ urlImage, titleNews, newsResume, linkTitle, link }) => {
  const imgNews = { uri: urlImage };
  // eslint-disable-next-line no-underscore-dangle
  const _handleOpenWithLinking = () => {
    Linking.openURL(link);
  };
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.imageStyle} source={imgNews} />
      </View>
      <View style={styles.textContainer}>
        {titleNews && <Text style={styles.title}>{titleNews}</Text>}
        {newsResume && <Text style={styles.resume}>{newsResume}</Text>}
        {linkTitle && (
          <TouchableHighlight
            onPress={_handleOpenWithLinking}
            underlayColor="#936abd"
          >
            <Text style={styles.textTerms}>{linkTitle}</Text>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    width: width * 0.85,
    borderRadius: 30,
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 4,
    marginTop: height * 0.033,
    marginHorizontal: width * 0.08,
  },
  imageStyle: {
    maxWidth: width * 0.85,
    maxHeight: height * 0.2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height * 0.18,
    resizeMode: "cover",
  },
  textContainer: {
    marginHorizontal: 18,
    marginBottom: 15,
    marginTop: 10,
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
    textDecorationLine: "underline",
  },
});

export default News;
