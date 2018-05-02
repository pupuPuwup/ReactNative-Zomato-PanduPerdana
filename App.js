import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Footer, FooterTab, Item, Input, View, Fab } from 'native-base';
import axios from 'axios'

const imageNotFound = require('./src/images/embak.jpg')

class App extends Component {
    constructor(){
        super()
        this.state = { 
            resto : [], 
            search : ""
    
        }
    }

    get = () => {
      var uri = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;
      var config = {
        headers:{'user-key':'45ab38014dd1df0a2949dc48c3997f89'}
    }

      axios.get(uri, config).then((ambilData)=>{
        this.setState({
          resto : ambilData.data.restaurants,
        })
      })
    };


    renderWarung() {
        return this.state.resto.map((item,index) =>
        <Card key={index}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: item.restaurant.thumb}} />
                <Body>
                  <Text>{item.restaurant.name}</Text>
                  <Text note>{item.restaurant.location.city}</Text>
                </Body>
              </Left>
              <Right>
                <Text>Rp.{item.restaurant.average_cost_for_two}</Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={item.restaurant.thumb == '' ? imageNotFound : { uri: item.restaurant.thumb }} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name='home' />
                <Text>{item.restaurant.location.address}</Text>
              </Left>
            </CardItem>
          </Card>
        );
    }

    

  render() {
    return (
      <Container>
        <Header searchBar rounded style={{ backgroundColor: '#d94040'}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(x) => {this.setState({search :x})}} />
          </Item>
        </Header>
          <Button full danger onPress={() => {this.get()}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#ffffff' }}>Lihat Daftar Resto</Text>
          </Button>
        <View style={{ flex: 1 }}>
        <Content>
          {this.renderWarung()}
        </Content>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View>

      </Container>
    );
  }
}

export default App;