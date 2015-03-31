React = require('react')
ReactSelector = require('react-selector')

RANDOM_NAMES = [
                    "A Nous la Liberte",
                    "Dead End",
                    "About Schmidt",
                    "Absence of Malice",
                    "Adaptation",
                    "The Adjuster",
                    "The Adventures of Robin Hood",
                    "Affliction",
                    "The African Queen",
                    "L'Age d'Or"
                ]

Item = React.createClass
    render: ->
        React.DOM.div {},
            React.DOM.a {href: '#'}, @props.name

SelectAllItem = React.createClass
    render: ->
        React.DOM.div {},
            React.DOM.a {href: '#'},
                React.DOM.strong {}, @props.name

App = React.createClass
    _seedItems: ->
        items = []
        for i in [0..9]
            name = RANDOM_NAMES[i]
            item = {
                id: i
                renderer: Item
                props: {name: name}
                name: name
                onToggle: @_toggleItem
            }
            items.push(item)

        items.push(@_seedSelectAllItem())

        return items

    _seedSelectAllItem: ->
        return {
            id: -1
            renderer: SelectAllItem
            props: {name: "Select All"}
            name: "Select All"
            onToggle: @_selectAll
        }

    _toggleItem: (id) ->
        all_items = []
        selected_items = []

        for item in @state.all_items
            if item.id == id
                selected_items.push(item)
            else
                all_items.push(item)

        for item in @state.selected_items
            if item.id == id
                all_items.push(item)
            else
                selected_items.push(item)

        @setState {
            all_items: all_items
            selected_items: selected_items
        }

    _selectAll: ->
        if @state.all_items.length != @state.selected_items
            all_items = []
            selected_items = []
            selected_items.push(@_seedSelectAllItem())

        if @state.all_items.length == 0
            all_items = @_seedItems()
            selected_items = []

        @setState {
            all_items: all_items
            selected_items: selected_items
        }


    getInitialState: ->
        return {
            all_items: @_seedItems()
            selected_items: []
        }

    _compare: (item_a, item_b) ->
        # we want special items to bubble up
        if item_a.id < 0
            return -1
        if item_b.id < 0
            return 1

        # normal comparison
        if item_a.name.toLowerCase() < item_b.name.toLowerCase()
            return -1
        else
            return 1


    render: ->
        React.DOM.div {className: "wrap"},
            React.createElement(ReactSelector, {
                universe: @state.all_items
                selected: @state.selected_items
                compare: @_compare
            })

React.render(React.createElement(App, {}), document.getElementById("app"))
