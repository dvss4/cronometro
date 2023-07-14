import React,{useState} from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

//cria fora pq vira global
let timer = null;
let segundos = 0;
let minutos = 0;
let horas = 0;

export default function App() {
  const [numero, setNumero]=useState('0');
  const [botao,setBotao] = useState('INICIAR');
  const [ultimo, setUltimo]= useState('');
  function iniciar(){
    // se o time nn é nulo, ou sej, esta rodando
    if(timer!== null){
      //tava rodando o botão, o cara apertou pausar, aí ele para o intervalo, muda o time pra null e seta o botão
      clearInterval(timer);
      timer = null;
      setBotao('INICIAR')
    } else{
      timer= setInterval(()=>{
        segundos++;
        if(segundos==60){
            segundos=0
            minutos++
        }
        if(minutos == 60){
          minutos=0;
          horas++
        }
        let formatado = (horas<10?'0'+horas:horas)+ ':'
         + (minutos<10?'0'+minutos:minutos) + ':' 
         + (segundos<10?'0'+segundos:segundos);
        //dois pontos é faldo, antes é verdadeiro e antes da interrogação é a pegrunta
        setNumero(formatado);
      },1000)//referência de um segundo
      setBotao('PARAR');
    }
  }

  function zerar(){
    
    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }
    setUltimo(numero);
    setNumero(0);
    segundo = 0;
    minutos = 0;
    horas= 0;
    setBotao('INICIAR');

  }

 return (
   <SafeAreaView style = {styles.Container}>
    <StatusBar/>
    <Image
    //dentro do app, quantidade de ponto, é a quantidade de pastas
    source={require('./src/Images/crono.png')}
    />
    {/* botão que chama função */}
    <Text style = {styles.tempo}>
      {numero ==0? '00:00:00': numero}
    </Text>

    <View style = {styles.viewBotao}>
      <TouchableOpacity style={styles.btn} onPress={iniciar}>
        <Text style={styles.btnTexto}>
          {botao}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={zerar}>
        <Text style={styles.btnTexto}>
          ZERAR
        </Text>
      </TouchableOpacity>

    </View>

    <Text style={styles.tempoMedido}>
      {ultimo}
    </Text>
   </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  Container:{
    //deixa na tela toda flex
   flex: 1,
   backgroundColor: '#f08080',
   //alinhar itens
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempo:{
    //tamanho e negrito
    fontSize: 45,
    fontWeight: 'bold',
    color:'#fff',
    // para subir, pois ele está se distanciando do topo, o bottom não é o legal, pois ainda vai colocar algo
    marginTop: -160
  },
  viewBotao:{
    width: '100%',
    flexDirection: 'row',
    marginTop: 170,
    heigth:40,
    //da o distanciamento entre os componentes e entre o fim da vier
    justifyContent: 'space-around'
    
  },
  btn:{
    //flex1 altura toda
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height:40,
    width: 170,
    borderRadius: 20

  },
  btnTexto:{
    fontSize: 20,
    //fontStyle: 'italic',
    fontWeight: 'bold',
    color:'#f08080'
  },
  tempoMedido:{
    fontSize: 30,
    fontStyle:'italic',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 40 
  }
});
