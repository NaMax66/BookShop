<template>
  <div style="margin-top: 5rem">
    <!--show if not auth-->
    <h2>Hello stranger!</h2>
    <label for="secret">Enter the secret key</label>
    <form action="">
      <input id='secret' type="text" v-model="secretKey">
      <button type="submit" @click.prevent="checkSecret">Submit</button>
    </form>

    <!--show if auth-->
    <div class="admin__panel" v-if="verifiedUser">

      <div class="pane">
        <h3>Send data pane</h3>

        <div>
          <label for="key"
                 style="margin-right: .9rem"
          >Key</label>
          <input id="key" type="text"
                 v-model="inputKey"
          >
        </div>

        <div>
          <label for="value">Value</label>
          <input id="value" type="text"
                 v-model="inputValue"
          >
        </div>
        <button @click="sendData">Send</button>
      </div>

      <hr>

      <div class="pane">
        <h3>receive data pane</h3>

        <p class="server__response">{{ receivedData }}</p>
        <button class="send__btn" @click="getData">Get Data</button>
      </div>


    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AppAdmin',
    data(){
      return {
        verifiedUser: true,
        secretKey: '',

        inputKey: '',
        inputValue: '',

        receivedData: 'no data'
      }
    },
    methods: {
      getData() {
        axios.get('/getData')
          .then(data => this.receivedData = data)
          .catch(err => console.log(err))
      },

      sendData() {
        const key = this.inputKey;
        const value = this.inputValue;
        const data = {
          [key]: value
        };

        axios.post('/sendData', data)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      },

      checkSecret() {
        axios.post('./checkSecret', this.secretKey)
          .then(res => this.verifiedUser = res.data)
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped lang="scss">
  .admin__panel {
    margin-top: 2rem;
    display: inline-block;
    padding: 1rem;

    border: 2px solid #333;
    border-radius: 4px;



    h3 {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: #F56A3F;

    }

    .pane {
      display: inline-block;
      width: 100%;
      height: 10rem;
      position: relative;

      .send__btn {
        position: absolute;
        bottom: 0;
      }

    }

  }
</style>
