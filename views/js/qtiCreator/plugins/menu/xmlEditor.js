/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2016 (original work) Open Assessment Technologies SA ;
 */
define([
    'jquery',
    'i18n',
    'core/plugin',
    'ui/hider',
    'xmlEdit/editor',
    'taoQtiItem/qtiCreator/helper/xmlRenderer',
    'tpl!taoQtiItem/qtiCreator/plugins/button',
    'css!xmlEditQtiDebuggerCss/editor'
], function($, __, pluginFactory, hider, xmlEditor, xmlRenderer, buttonTpl) {
    'use strict';

    var _ns = '.qtiCreatorDebugger';


    return pluginFactory({
        name : 'xmlEditor',

        /**
         * Initialize the plugin (called during runner's init)
         */
        init : function init(){
            var self = this;
            var itemCreator = this.getHost();
            var item = this.getHost().getItem();
            var $container = this.getAreaBroker().getContainer();

            //create the editor container and add it to the dom
            this.$editor = $('<div>', {'class' : 'qti-creator-source'});
            this.editor = xmlEditor.init(this.$editor, {
                hidden : true,
                readonly : true
            });
            this.$element = $(buttonTpl({
                icon: 'source',
                title: __('Item source'),
                text : __('XML')
            })).on('click', function saveHandler(e){
                e.preventDefault();

                if(self.getState('active')){
                    self.setState('active', false);
                    self.editor.hide();
                } else {
                    self.setState('active', true);
                    self.editor.setValue(xmlRenderer.render(item));
                    self.editor.show();
                }
            });
            this.disable();

            itemCreator.on('ready saved', function(){
                self.enable();
            });
        },

        render : function render(){
            //attach the element to the menu area
            this.getAreaBroker().getMenuArea().append(this.$element);
            this.getAreaBroker().getContainer().append(this.$editor);

            this.show();
        }
    });
});

