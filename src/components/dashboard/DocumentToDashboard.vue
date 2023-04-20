<template>
  <div>
    <table class="table table-striped">
      <thead>
        <th>#</th>
        <th v-for="(keyName, index) in columnDefs" :key="index">
          {{ keyName }}
        </th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr v-for="(file, index) in files" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td v-for="(keyName, index) in file" :key="index">
            {{ keyName }}
          </td>
          <td>
            <v-btn
              icon
              color="primary"
              @click="
                () => {
                  toDashboard(file.id);
                }
              ">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { documentAPI } from "@/api/document.js";
export default {
  data: () => ({
    files: [],
  }),
  methods: {
    toDashboard(id) {
      this.$router.push({ name: "dashboardWorkspace", params: { id: id } });
      console.log(this.$route, `dashboard/workspace/${id}`);
    },
  },
  computed: {
    columnDefs() {
      if (this.files.length) {
        let columnDefs = this.files[0];
        return Object.keys(columnDefs);
      }
      return [];
    },
  },
  async created() {
    let res = await documentAPI.getListDocument();
    console.log(res);
    for (let i = 0; i < res.data.length; i++) {
      this.files.push(res.data[i]);
    }
    console.log(this.files);
  },
};
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
  background: #ffed86;
}
.config {
  margin: 20px auto;
}
</style>
