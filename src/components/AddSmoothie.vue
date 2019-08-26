<template>
  <div class="add-smoothie container">
    <h2 class="strong indigo-text shadow">Add Smoothie recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie title</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field" v-for="(ing, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete rotate" @click="deleteIng(ing)">clear</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="anotherIng">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Add smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      anotherIng: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // console.log(this.slug);
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
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
        this.ingredients.push(this.anotherIng);
        this.anotherIng = null;
        this.feedback = null;
        // console.log(this.ingredients);
      } else {
        this.feedback = "You must enter a value";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !== ing;
      });
    }
  }
};
</script>

<style>
</style>
