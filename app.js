import Router from "./lib/router";
import _ from "lodash";
import $ from "jquery";
import "./assets/scss/home.scss";

$.ajax("/api/test").then(function(data) {
  alert(data);
});
