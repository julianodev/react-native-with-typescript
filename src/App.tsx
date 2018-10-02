import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, KeyboardAvoidingView, TextInput, Dimensions } from 'react-native'
import { Appbar, Button, Card, Title, Dialog, Paragraph, Portal } from 'react-native-paper';

export default class App extends React.Component<any, any, any> {

  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });

  widthDevice = Dimensions.get('window').width;

  onClickLoadMovies = async () => {
    this.setState({ isLoading: true });

    await fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((data: {
        title: string,
        description: string,
        movies: [{ title: string, releaseYear: string }]
      }) => {


        setTimeout(() => {

          this.setState({
            isLoading: false,
            title: data.title,
            description: data.description,
            dataSource: data.movies,
          }, function () {

          });
        }, 1000);


      }).catch((error) => {
        console.error(error);
      });
  }

  onEditItem = (item: any) => {
    alert(`Edit => ${item.title}`);
  }

  constructor(public props: any) {
    super(props)
    this.state = {
      isLoadingComplete: false,
      visible: false,
      dataSource: []
    };
  }

  async componentDidMount(): Promise<any> {
    this.onClickLoadMovies();
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 30, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#3498DB" />
          <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 10, color: '#222222', fontWeight: 'bold' }}>Carregando filmes.... </Text>
        </View>
      )
    }

    if (this.state.dataSource.length === 0) {
      return (

        <View style={styles.container}>
          <Title>Nenhum filme encontrado</Title>
          <Button icon="sync"   color="#3498DB" mode="outlined" onPress={() => this.onClickLoadMovies()}>
            Carregar filmes
  </Button>
        </View>
      );
    }

    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <Title>Olá, Lucas Juliano</Title>
          <FlatList
            style={{ width: this.widthDevice, padding: 10 }}
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <Card style={{ marginBottom: 10 }}>
                <Card.Content >
                  <Title>#{item.id} - {item.title}</Title>
                  <Paragraph>{item.releaseYear}</Paragraph>

                </Card.Content>
                {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                <Card.Actions>
                  <Button color="red" icon="delete" mode="text" onPress={() => {
                    this.setState({ ...this.state.dataSource.splice({ item }, 1) });
                  }}>REMOVER</Button>
                  <Button color="#3498DB" icon="edit" mode="text" onPress={() => { this.onEditItem(item) }}>EDITAR</Button>
                </Card.Actions>


              </Card>
            }
            keyExtractor={({ id }, index) => id}
          />

          <Appbar style={{ width: this.widthDevice, backgroundColor: "#3498DB" }}>
            <Appbar.Action color="#fff" icon="archive" onPress={() => console.log('Pressed archive')} />
            <Appbar.Action color="#fff" icon="mail" onPress={() => console.log('Pressed mail')} />
            <Appbar.Action color="#fff" icon="label" onPress={() => console.log('Pressed label')} />
            <Appbar.Action color="#fff" icon="delete" onPress={() => console.log('Pressed delete')} />
          </Appbar>
        </View>
      </KeyboardAvoidingView>


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
    height: 44
  }, bottom: {

  },
})
