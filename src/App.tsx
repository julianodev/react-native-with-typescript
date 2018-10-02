import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'

export default class App extends React.Component<any, any, any> {


  constructor(public props: any) {
    super(props)
    this.state = {
      isLoadingComplete: false,
    }
  }

  async componentDidMount(): Promise<any> {
    return await fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((data: {
        title: string,
        description: string,
        movies: [{ title: string, releaseYear: string }]
      }) => {

        this.setState({
          isLoading: false,
          title: data.title,
          description: data.description,
          dataSource: data.movies,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center', color: 'blue', fontWeight: '600', fontSize: 24 }}>{this.state.title} </Text>
        <Text style={{ alignSelf: 'center', color: 'blue', fontWeight: '600', fontSize: 16 }}>{this.state.description} </Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={(item: any) => <Text style={styles.item}>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  }, item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
