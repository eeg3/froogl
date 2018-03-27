<template>
    <div class="card border-secondary mb-3">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a :class="{active: isActive('Summary')}" class="nav-link hvr-overline-reveal" href="#" @click.prevent="display = 'Summary'">Summary</a>
                </li>
                <li class="nav-item">
                    <a :class="{active: isActive('Add')}" class="nav-link hvr-overline-reveal" href="#" @click.prevent="display = 'Add'">Add New</a>
                </li>
            </ul>
        </div>

        <!-- Summary -->
        <div id="grid-summary" v-if="display == 'Summary'" :display="display" class="card-body">
            <h4 class="card-title">Details</h4>
            <h6 class="card-title">March 26, 2018</h6>
            <p class="card-text">
                <ul class="list-group">
                    <li v-for="(item, index) in items" :key="(item, index)" class="list-group-item" @click="removeItem(index)">
                        <span class="float-left">{{ item.name }}</span>
                        <span class="float-right">{{ item.price }}</span>
                    </li>
                </ul>
                <ul class="list-group mt-3">
                    <li class="list-group-item">
                        <span class="float-left font-weight-bold">Total Savings</span>
                        <span class="float-right">{{ totalCost }}</span>
                    </li>
                </ul>
            </p>
        </div>

        <!-- Add New -->
        <div id="grid-add" v-if="display == 'Add'" :display="display" class="card-body">
            <div class="row">
                <div class="col">
                    <p>This page will be for adding new savings!</p>
                </div>
            </div>
            <!-- Manual Add -->
            <div id="manualAdd" v-if="entryType == 'Manual'" class="row">
                <div class="col">
                    <p>Manual entry code goes here.</p>
                    <div class="form-group">
                        <label for="itemName" class="font-weight-bold">Item Name</label><input type="text" id="itemName" class="form-control" v-model="itemName">
                    </div>
                    <div class="form-group">
                        <label for="itemCost" class="font-weight-bold">Item Cost</label><input type="text" id="itemCost" class="form-control" v-model="itemCost">
                    </div>
                    <button class="btn btn-primary" @click="addItem">Add Item</button>
                    <button class="btn btn-primary" @click="entryType = ''">Return</button>
                    <span>{{ itemName }} - {{ itemCost }}</span>
                </div>
            </div>
            <!-- Scan Add -->
            <div id="scanAdd" v-else-if="entryType == 'Scan'" class="row">
                <div class="col">
                    <p>Scan entry code goes here.</p>
                    <button class="btn btn-primary" @click="addItem">Add Item</button>
                    <button class="btn btn-primary" @click="entryType = ''">Return</button>
                </div>
            </div>
            <!-- Add Option Selection -->
            <div v-else class="row">
                <div class="col-sm-6">
                    <div class="card text-white bg-primary hvr-grow mb-3 ml-3" @click="entryType = 'Manual'">
                        <div class="card-header">Add</div>
                        <div class="card-body">
                            <h4 class="card-title">Manual Entry</h4>
                            <p class="card-text">Click here to manually add savings.</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card text-white bg-info hvr-grow mb-3 mr-3" @click="entryType = 'Scan'">
                        <div class="card-header">Add</div>
                        <div class="card-body">
                            <h4 class="card-title">Scan Entry</h4>
                            <p class="card-text">Click here to scan a barcode for savings.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  props: ["totalAdditions"],
  data: function() {
    return {
      display: "Summary", // Used to specify visible nav
      entryType: "", // Holds selection of entry type whether manual or scan
      itemName: "", // Input
      itemCost: "", // Input
      items: [
        {
          name: "Item 1",
          price: "100"
        },
        {
          name: "Item 2",
          price: "100"
        }
      ] // Holds all items.
    };
  },
  created: function() {
    console.log("Initial totalAdditions value: " + this.totalAdditions);
  },
  computed: {
    totalCost: function() {
      var totalCost = 0;
      for (var i = 0; i < this.items.length; i++) {
        totalCost += Number.parseInt(this.items[i].price);
      }
      return totalCost;
    }
  },
  methods: {
    isActive: function(val) {
      if (this.display == val) return true;
    },
    addItem: function() {
      this.items.push({
        name: this.itemName,
        price: this.itemCost
      });

      // Emit up to parent
      this.$emit("itemAdded", this.itemName);

      // Revert back to Summary and clear entry type
      this.display = "Summary";
      this.entryType = "";

      // Reset inputs
      this.itemName = "";
      this.itemCost = "";
    },
    removeItem: function(index) {
      this.items.splice(index, 1); // Remove the item by splicing it out of the array
    }
  },
  components: {}
};
</script>

<style>
/* Overline Reveal */
.hvr-overline-reveal {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  position: relative;
  overflow: hidden;
}
.hvr-overline-reveal:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  top: 0;
  background: #2098d1;
  height: 4px;
  -webkit-transform: translateY(-4px);
  transform: translateY(-4px);
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-overline-reveal:hover:before,
.hvr-overline-reveal:focus:before,
.hvr-overline-reveal:active:before {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}
</style>
