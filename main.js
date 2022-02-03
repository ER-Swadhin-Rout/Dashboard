(function ($) {
    var CheckboxDropdown = function (el) {
        var _this = this;
        this.isOpen = false;
        this.areAllChecked = false;
        this.$el = $(el);
        this.$label = this.$el.find('.dropdown-label');
        this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
        this.$inputs = this.$el.find('[type="checkbox"]');

        this.onCheckBox();

        this.$label.on('click', function (e) {
            e.preventDefault();
            _this.toggleOpen();
        });

        this.$checkAll.on('click', function (e) {
            e.preventDefault();
            _this.onCheckAll();
        });

        this.$inputs.on('change', function (e) {
            _this.onCheckBox();
        });
    };

    CheckboxDropdown.prototype.onCheckBox = function () {
        this.updateStatus();
    };

    CheckboxDropdown.prototype.updateStatus = function () {
        var checked = this.$el.find(':checked');

        this.areAllChecked = false;
        this.$checkAll.html('Check All');

        if (checked.length <= 0) {

        }
        else if (checked.length === 1) {
            this.$label.html(checked.parent('label').text());
        }
        else if (checked.length === this.$inputs.length) {
            this.$label.html('All Selected');
            this.areAllChecked = true;
            this.$checkAll.html('Uncheck All');
        }
        else {
            this.$label.html(checked.length + ' Selected');
        }
    };

    CheckboxDropdown.prototype.onCheckAll = function (checkAll) {
        if (!this.areAllChecked || checkAll) {
            this.areAllChecked = true;
            this.$checkAll.html('Uncheck All');
            this.$inputs.prop('checked', true);
        }
        else {
            this.areAllChecked = false;
            this.$checkAll.html('Check All');
            this.$inputs.prop('checked', false);
        }

        this.updateStatus();
    };

    CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
        var _this = this;

        if (!this.isOpen || forceOpen) {
            this.isOpen = true;
            this.$el.addClass('on');
            $(document).on('click', function (e) {
                if (!$(e.target).closest('[data-control]').length) {
                    _this.toggleOpen();
                }
            });
        }
        else {
            this.isOpen = false;
            this.$el.removeClass('on');
            $(document).off('click');
        }
    };

    var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
    for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
        new CheckboxDropdown(checkboxesDropdowns[i]);
    }
})(jQuery);


// active class

$(document).ready(function () {

    $(".one").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".close").click(function () {
        $('#wrapper').removeClass('toggled');
    });
});



// Side toggle

$("#menu-toggle").click(function (e) {
    e.preventDefault();

    $("#wrapper").toggleClass("toggled");
    if ($('#wrapper').hasClass('toggled')) {
        $('#sidebar-wrapper').show();
    }
    else {
        $('#sidebar-wrapper').hide();
    }
});





jQuery('#master').on('click', function (e) {
    if ($(this).is(':checked', true)) {
        $(".sub_chk").prop('checked', true);
    }
    else {
        $(".sub_chk").prop('checked', false);
    }
});

jQuery('.delete_all').on('click', function (e) {
    var allVals = [];
    $(".sub_chk:checked").each(function () {
        allVals.push($(this).attr('data-id'));
    });
    //alert(allVals.length); return false;  
    if (allVals.length <= 0) {
        alert("Please select row.");
    }
    else {

        WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";
        var check = confirm(WRN_PROFILE_DELETE);
        if (check == true) {

            $.each(allVals, function (index, value) {
                $('table tr').filter("[data-row-id='" + value + "']").remove();
            });


        }
    }
});

$('.remove-row').on('click', function (e) {
    WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";
    var check = confirm(WRN_PROFILE_DELETE);
    if (check == true) {
        $('table tr').filter("[data-row-id='" + $(this).attr('data-id') + "']").remove();
    }
});





