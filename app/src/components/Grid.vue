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
      <h4 class="card-title">Details
        <span @click="queryItemList" class="fa fa-redo fa-sm btn float-right"></span>
      </h4>
      <app-loadingstatus :status="loadStatus" class="card-title"></app-loadingstatus>
      <div class="card-text" v-if="loadStatus == true">

        <ul class="list-group" v-for="(item, index) in items" :key="(item, index)">
          <app-list-item :item="item" :index="index" @saveItem="addItem($event.item)" @removeItem="removeItem($event.index, $event.name)"></app-list-item>
        </ul>

        <div class="summary-details">
          <ul class="list-group mt-3">
            <li class="list-group-item">
              <span class="float-left font-weight-bold">Total Savings</span>
              <span :class="{ 'text-success': (totalCost > 0) }" class="float-right font-weight-bold">${{ totalCost }}</span>
            </li>
          </ul>
        </div>

      </div>
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
          <p>{{ addStatus }} </p>
          <div class="form-group">
            <label for="itemName" class="font-weight-bold">Item Name</label><input type="text" id="itemName" class="form-control" v-model="itemName">
          </div>
          <div class="form-group">
            <label for="itemCost" class="font-weight-bold">Item Cost</label><input type="text" id="itemCost" class="form-control" v-model="itemCost">
          </div>
          <button class="btn btn-primary" @click="addItem">Add Item</button>
          <button class="btn btn-primary" @click="entryType = ''">Return</button>
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
import axios from "axios";
import LoadingStatus from "../components/widgets/LoadingStatus.vue";
import ListItem from "../components/ListItem.vue";

export default {
  props: ["totalAdditions", "token"],
  data: function() {
    return {
      display: "Summary", // Used to specify visible nav
      entryType: "", // Holds selection of entry type whether manual or scan
      itemName: "", // Input
      itemCost: "", // Input
      items: {},
      addStatus: "",
      loadStatus: false
    };
  },
  created: function() {
    console.log("Initial totalAdditions value: " + this.totalAdditions);
    this.dashStatus = "Loading...";
    this.queryItemList();
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
    convertToMonth: function(month) {
      if (month == "01") {
        return "January";
      } else if (month == "02") {
        return "February";
      } else if (month == "03") {
        return "March";
      } else if (month == "04") {
        return "April";
      } else if (month == "05") {
        return "May";
      } else if (month == "06") {
        return "June";
      } else if (month == "07") {
        return "July";
      } else if (month == "08") {
        return "August";
      } else if (month == "09") {
        return "September";
      } else if (month == "10") {
        return "October";
      } else if (month == "11") {
        return "November";
      } else if (month == "12") {
        return "December";
      }
    },
    addItem: function(item) {
      // Emit up to parent
      this.$emit("itemAdded", this.itemName);
      if (item.name != undefined) {
        // item will receive an event regardless, so check if it looks like an item object by seeing if name is defined.
        console.log("Got here: " + item.name + ", " + item.price);
        console.log("Item inside: " + item);
        this.itemName = item.name;
        this.itemCost = item.price;
      }

      var today = new Date();
      this.itemDate =
        (today.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        today
          .getDate()
          .toString()
          .padStart(2, "0") +
        "-" +
        today
          .getFullYear()
          .toString()
          .slice(2); // 04-04-18

      let vm = this;
      axios
        .post(
          "/items?name=" +
            vm.itemName +
            "&price=" +
            vm.itemCost +
            "&date=" +
            vm.itemDate,
          {
            headers: {
              Authorization: vm.token
            }
          }
        )
        .then(function(response) {
          // If it's successful, modify client-side variable versus making another AJAX call for speed.
          if (response.statusCode == "400") {
            console.log("Error adding item.");
            vm.addStatus = "Error adding item. Please try again.";
          } else {
            vm.items.unshift({
              name: vm.itemName,
              price: vm.itemCost,
              date: vm.itemDate
            });
            // Revert back to Summary and clear entry type once post is successful; this prevents jitteriness on grid.
            vm.display = "Summary";
            vm.entryType = "";

            // Reset inputs
            vm.itemName = "";
            vm.itemCost = "";
          }
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    removeItem: function(index, itemName) {
      let nameToDelete = this.items[index].name;

      // If we passed a name to delete, we're calling from component and need to delete original name not current name, so index doesn't necessarily match.
      if (itemName) {
        nameToDelete = itemName;
        console.log("got herezz: " + itemName);
      }

      let vm = this;
      axios
        .post("/delete-item?name=" + nameToDelete, {
          headers: {
            Authorization: vm.token
          }
        })
        .then(function(response) {
          if (response.statusCode == "400") {
            vm.dashStatus = "Error removing item.";
          } else {
            vm.items.splice(index, 1); // Remove the item by splicing it out of the array
          }
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    queryItemList: function() {
      let vm = this;

      vm.items = [];
      vm.loadStatus = false;
      axios
        .get("/items", {
          headers: {
            Authorization: vm.token
          }
        })
        .then(function(response) {
          for (var i = 0; i < response.data.length; i++) {
            vm.items.push(response.data[i]);
          }

          // Put the items in descending order by date.
          vm.items.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
          });

          console.log("Item list: " + JSON.stringify(vm.items));

          vm.loadStatus = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    "app-loadingstatus": LoadingStatus,
    "app-list-item": ListItem
  }
};
</script>

<style>
.table-bordered {
  border: 1.5px solid rgba(0, 0, 0, 0.125);
}

.date-header,
.summary-details {
  margin-top: 22px;
}

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
  background: #28a745;
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
/* Grow */
.hvr-grow {
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  transition-duration: 0.3s;
  transition-property: transform;
}

.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
  transform: scale(1.1);
}
</style>
