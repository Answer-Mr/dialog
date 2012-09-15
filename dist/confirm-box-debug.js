define("#dialog/0.9.1/confirm-box-debug", ["./base-dialog-debug", "./anim-dialog-debug", "$-debug", "#overlay/0.9.9/overlay-debug", "#iframe-shim/0.9.3/iframe-shim-debug", "#position/0.9.2/position-debug", "#widget/0.9.16/widget-debug", "#base/0.9.16/base-debug", "#events/0.9.1/events-debug", "#class/0.9.2/class-debug", "#easing/1.0.0/easing-debug", "#overlay/0.9.9/mask-debug"], function(require, exports, module) {

    var $ = require('$-debug'),
        AnimDialog = require('./anim-dialog-debug');

    // ConfirmBox
    // -------
    // ConfirmBox 是一个有基础模板和样式的对话框组件。

    var ConfirmBox = AnimDialog.extend({

        attrs: {

            // 默认模板，不要覆盖
            template:
                    '<div class="ui-xbox">\
                        <div class="ui-xbox-action"><a href="javascript:;" class="ui-xbox-close" data-role="close" title="关闭">×</a></div>\
                        <div class="ui-xbox-content">\
                            <div class="ui-confirmXbox">\
                                <div class="ui-confirmXbox-title sl-linear-light" data-role="title"><h2></h2></div>\
                                <div class="ui-confirmXbox-container">\
                                    <div class="ui-confirmXbox-content" data-role="content"></div>\
                                    <div class="ui-confirmXbox-operation" data-role="operation">\
                                        <div class="ui-button ui-button-sorange ui-confirmXbox-confirm" data-role="confirm">\
                                            <a href="javascript:;" class="ui-button-text">确定</a>\
                                        </div>\
                                        <div class="ui-button ui-button-swhite ui-confirmXbox-cancel" data-role="cancel">\
                                            <a href="javascript:;" class="ui-button-text">取消</a>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
        
            // 指定标题内容
            title: '默认标题',
            // 指定内容的 html
            content: '默认内容',

            width: 500,
            hasMask: true,
            effect: null,

            align: {
                selfXY: ['50%', '50%'],
                baseXY: ['50%', '38%']
            },

            hasTitle: true,
            hasOk: true,
            hasCancel: true,            
            hasCloseX: true
        },

        setup: function() {
            AnimDialog.superclass.setup.call(this);

            if (!this.get('hasTitle')) {
                this.$('[data-role=title]').remove();
            }
            if (!this.get('hasOk')) {
                this.$('[data-role=confirm]').remove();
            }
            if (!this.get('hasCancel')) {
                this.$('[data-role=cancel]').remove();
            }
            if (!this.get('hasCloseX')) {
                this.$('[data-role=close]').remove();
            }
            if (!this.get('hasOk') && !this.get('hasCancel')) {
                this.$('[data-role=operation]').remove();
            }
        }
    });

    ConfirmBox.alert = function(content, callback) {
        new ConfirmBox({
            content: content,
            hasTitle: false,
            hasCancel: false,
            hasCloseX: false,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        }).show();
    };

    ConfirmBox.confirm = function(content, title, confirmCb, cancelCb) {
        new ConfirmBox({
            content: content,
            title: title || '确认框',
            hasCloseX: false,
            onConfirm: function() {
                confirmCb && confirmCb();
                this.hide();
            },
            onClose: function() {
                cancelCb && cancelCb();            
            }
        }).show();
    };

    ConfirmBox.show = function(content, callback) {
        new ConfirmBox({
            content: content,
            hasTitle: false,
            hasOk: false,            
            hasCancel: false,
            hasCloseX: true,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        }).show();
    };

    module.exports = ConfirmBox;

});

