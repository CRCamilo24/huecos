import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewsContext } from "../components/context/NewsContext";
import News from "../components/reports/components/News/News";

const { height, width } = Dimensions.get("screen");

export default function Search() {
  const isFocused = useIsFocused();

  const [{ news, loading }, { getNews }] = NewsContext();

  const obtainNews = async () => {
    news === null && (await getNews({ collection: "news" }));
  };

  useEffect(() => {
    isFocused && obtainNews();
  }, [isFocused]);

  const renderNews = ({ item, index }) => (
    console.log("index:", index),
    (
      <News
        key={index}
        urlImage={item.url}
        titleNews={item.titleNews}
        newsResume={item.newsResume}
        link={item.link}
        linkTitle={item.linkTitle}
        index={index}
        news={news}
      />
    )
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.generalContainer}>
        <View style={styles.newsCointainer}>
          {!loading && (
            <FlatList
              data={news}
              renderItem={renderNews}
              keyExtractor={(item) => item.id}
            />
          )}
          {loading && (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    backgroundColor: "white",
    height: height * 0.9,
  },
  container: {
    height: height * 0.09,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
  },
  newsCointainer: {
    width,
    height: height * 0.77,
  },
});
