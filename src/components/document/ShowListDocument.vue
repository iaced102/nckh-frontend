<template>
    <div>        
        <table class="table table-striped">
            <thead>
                <th>#</th>
                <th
                  v-for="(keyName, index) in columnDefs"
                  :key="index"
                > {{ keyName }}
                </th>
                <th>Action</th>
            </thead>
            <tbody>
                <tr v-for="(file, index) in files" :key="index">
                <th scope="row">{{ index +1 }}</th> 
                <td v-for="(keyName, index) in file" :key="index">
                    {{ keyName }}
                </td>
                <td>
                    <div>
                        <v-btn icon color="primary" @click="()=>{toEditDocument(file.id)}">
                            <v-icon>mdi-cog</v-icon>
                        </v-btn>
                    </div>
                </td>
                </tr>
            </tbody>
    </table>
    <v-btn @click="toConfigDocument" class="config" v-if="!callByScheduler">Tạo mới</v-btn>
    </div>
</template>

<script>
import {documentAPI} from '@/api/document.js'
export default {
    data: () => ({
      files: [
      ],
    }),
    methods: {
        toConfigDocument() {
            /* if (this.$store.state.user.user.userInfo.orgChart == 'superUser' || this.$store.state.user.user.userInfo.orgChart == 'staff') {
                this.$router.push('/document/config')
            } else {
                console.log('permission denied ')
            } */    
            this.$router.push('/document/config')
        },
        toEditDocument(id) {
          /* if (this.$store.state.user.user.userInfo.orgChart == 'superUser' || this.$store.state.user.user.userInfo.orgChart == 'staff') {
                this.$router.push('/document/edit')
            } else {
                console.log('permission denied ')
            } */
            // let file = this.files[]
            console.log(id)
            if (this.callByScheduler == false) {
                this.$router.push(`document/editDocument/${id}`)
            } else {
                this.$emit("toConfigScheduler",id)
            }
        }
    },
    computed:{
        columnDefs(){
            if(this.files.length){
                let columnDefs = this.files[0]
                return Object.keys(columnDefs)
            }
            return []
        }
    },
    async created() {
        let res = await documentAPI.getListDocument();
        console.log(res);
        for (let i=0; i< res.data.length; i++) {
          this.files.push(res.data[i]);
        }
        console.log(this.files);
    },
    props: {
        callByScheduler: {
            title: Boolean,
            default: false
        }
    }
}
</script>

<style>
table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 1200px;
  width: 100%;
  margin: 40px auto;
  position: relative;
}
thead {
  background: #FFED86;
}
.config {
    margin: 20px auto;
}
</style>