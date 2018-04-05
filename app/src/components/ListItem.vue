<template>
    <li @click="infoMode = !infoMode" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-2">
                <span v-if="!editMode" class="float-left">{{ item.name }}</span>
                <span v-else class="float-left"><input v-model="item.name" class="form-control"></span>
            </div>
            <div class="col-2">
                <span class="float-left">{{ item.date }}</span>
            </div>
            <div class="col-8">
                <span v-if="!editMode" :class="{ 'text-success': (item.price > 0) }" class="float-right font-weight-bold">${{ item.price }}</span>
                <span v-else class="float-right"><input v-model="item.price" :class="{ 'text-success': (item.price > 0) }" class="form-control float-right font-weight-bold"></span><br>
            </div>
        </div>
        <div class="row mt-2" v-if="editMode || infoMode">
            <div class="col-6">
                <button v-if="editMode" @click="saveItem" class="btn btn-sm btn-outline-success float-left mr-2">Save</button>
                <button @click="editMode = true" v-if="!editMode" class="btn btn-sm btn-outline-success float-left mr-2">Edit</button>
                <button @click="removeItem" class="btn btn-sm btn-outline-danger float-left">Delete</button>
            </div>
            <div class="col-6">
                <span class="float-right">Even more test!</span>
            </div>
        </div>
    </li>
</template>

<script>
export default {
  props: ["item", "index"],
  data: function() {
    return {
      editMode: false,
      infoMode: false,
      originalItemName: this.item.name
    };
  },
  methods: {
    saveItem: function() {
      console.log("Setting to false");

      this.$emit("removeItem", {
        index: this.index,
        name: this.originalItemName
      });
      this.$emit("saveItem", { item: this.item, index: this.index });
      this.editMode = false;
      // emit up to saveItem
    },
    removeItem: function() {
      this.$emit("removeItem", { index: this.index, name: this.item.name });
    }
  }
};
</script>
