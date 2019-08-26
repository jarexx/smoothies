<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h5>Edit a smoothie:</h5>
    <h2 class="indigo-text shadow">"{{smoothie.title}}"</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie title</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div class="field" v-for="(ing, index) in smoothie.ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete rotate" @click="deleteIng(ing)">clear</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="anotherIng">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Update smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      anotherIng: null,
      // ingredients: [],
      feedback: null
    };
  },
  methods: {
    editSmoothie() {
      // console.log(this.smoothie.title, this.smoothie.ingredients)
      if (this.smoothie.title) {
        this.feedback = null;
        // create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => {
            console.log(err);
          });
        // console.log(this.title, this.ingredients);
      } else {
        this.feedback = "You must enter a title";
      }
    },
    addIng() {
      if (this.anotherIng) {
        this.smoothie.ingredients.push(this.anotherIng);
        this.anotherIng = null;
        this.feedback = null;
        // console.log(this.ingredients);
      } else {
        this.feedback = "You must enter a value";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient !== ing;
        }
      );
    }
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
        // console.log(doc.data)
      });
    });
  }
};
</script>

<style>
</style>
