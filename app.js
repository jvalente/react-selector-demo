// Generated by CoffeeScript 1.9.1
(function() {
  var App, Item, RANDOM_NAMES, React, ReactSelector, SelectAllItem;

  React = require('react');

  ReactSelector = require('react-selector');

  RANDOM_NAMES = ["A Nous la Liberte", "Dead End", "About Schmidt", "Absence of Malice", "Adaptation", "The Adjuster", "The Adventures of Robin Hood", "Affliction", "The African Queen", "L'Age d'Or"];

  Item = React.createClass({
    render: function() {
      return React.DOM.div({}, React.DOM.a({
        href: '#'
      }, this.props.name));
    }
  });

  SelectAllItem = React.createClass({
    render: function() {
      return React.DOM.div({}, React.DOM.a({
        href: '#'
      }, React.DOM.strong({}, this.props.name)));
    }
  });

  App = React.createClass({
    _seedItems: function() {
      var i, item, items, j, name;
      items = [];
      for (i = j = 0; j <= 9; i = ++j) {
        name = RANDOM_NAMES[i];
        item = {
          id: i,
          renderer: Item,
          props: {
            name: name
          },
          name: name,
          onToggle: this._toggleItem
        };
        items.push(item);
      }
      items.push(this._seedSelectAllItem());
      return items;
    },
    _seedSelectAllItem: function() {
      return {
        id: -1,
        renderer: SelectAllItem,
        props: {
          name: "Select All"
        },
        name: "Select All",
        onToggle: this._selectAll
      };
    },
    _toggleItem: function(id) {
      var all_items, item, j, k, len, len1, ref, ref1, selected_items;
      all_items = [];
      selected_items = [];
      ref = this.state.all_items;
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        if (item.id === id) {
          selected_items.push(item);
        } else {
          all_items.push(item);
        }
      }
      ref1 = this.state.selected_items;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        item = ref1[k];
        if (item.id === id) {
          all_items.push(item);
        } else {
          selected_items.push(item);
        }
      }
      return this.setState({
        all_items: all_items,
        selected_items: selected_items
      });
    },
    _selectAll: function() {
      var all_items, selected_items;
      if (this.state.all_items.length !== this.state.selected_items) {
        all_items = [];
        selected_items = [];
        selected_items.push(this._seedSelectAllItem());
      }
      if (this.state.all_items.length === 0) {
        all_items = this._seedItems();
        selected_items = [];
      }
      return this.setState({
        all_items: all_items,
        selected_items: selected_items
      });
    },
    getInitialState: function() {
      return {
        all_items: this._seedItems(),
        selected_items: []
      };
    },
    _compare: function(item_a, item_b) {
      if (item_a.id < 0) {
        return -1;
      }
      if (item_b.id < 0) {
        return 1;
      }
      if (item_a.name.toLowerCase() < item_b.name.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    },
    render: function() {
      return React.DOM.div({
        className: "wrap"
      }, React.createElement(ReactSelector, {
        universe: this.state.all_items,
        selected: this.state.selected_items,
        compare: this._compare
      }));
    }
  });

  React.render(React.createElement(App, {}), document.getElementById("app"));

}).call(this);