<template>
  <div class="row container">
    <div class="col s12 m6 xl4 col-margin" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card hoverable">
        <div class="card-content">
          <i class="material-icons delete-button rotate" @click="deleteSmoothie(smoothie.id)">clear</i>
          <h2 class="indigo-text shadow">{{smoothie.title}}</h2>
          <ul class="ingredients">
            <li v-for="(ing, index) in smoothie.ingredients" :key="index">
              <span class="chip">{{ing}}</span>
            </li>
          </ul>
          <!-- </h2> -->
        </div>
        <span href="#" class="btn-floating halfway-fab btn-small indigo">
          <router-link :to="{name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug} }">
            <i class="material-icons edit">edit</i>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id !== id;
          });
        });
    }
  },
  created() {
    db.collection("smoothies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
          // console.log(doc.data(), doc.id);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
