
function initToolbar_65afe68a01932() {
    return {
        options: { "productListToolbarForm": { "mode": "product_list_mode", "direction": "product_list_dir", "order": "product_list_order", "limit": "product_list_limit", "modeDefault": "grid", "directionDefault": "asc", "orderDefault": "position", "limitDefault": 24, "url": "https:\/\/www.gretchenscottdesigns.com\/shop-by-print\/circle-of-love", "formKey": "73czzmFXlJJRnIGO", "post": false, "page": "p" } }.productListToolbarForm || {},
        getUrlParams: function () {
            let decode = window.decodeURIComponent,
                urlPaths = this.options.url.split('?'),
                urlParams = urlPaths[1] ? urlPaths[1].split('&') : [],
                params = {},
                parameters, i;

            for (i = 0; i < urlParams.length; i++) {
                parameters = urlParams[i].split('=');
                params[decode(parameters[0])] = parameters[1] !== undefined ?
                    decode(parameters[1].replace(/\+/g, '%20')) :
                    '';
            }

            return params;
        },
        getCurrentLimit: function () {
            return this.getUrlParams()[this.options.limit] || this.options.limitDefault;
        },
        getCurrentPage: function () {
            return this.getUrlParams()[this.options.page] || 1;
        },
        changeUrl(paramName, paramValue, defaultValue) {
            let urlPaths = this.options.url.split('?'),
                baseUrl = urlPaths[0],
                paramData = this.getUrlParams(),
                currentPage = this.getCurrentPage(),
                form, params, key, input, formKey, newPage;

            /**
             * calculates the page on which the first item of the current page will
             * be with the new limit and sets that number as the new page
             */
            if (currentPage > 1 && paramName === this.options.limit) {
                newPage = Math.floor(this.getCurrentLimit() * (currentPage - 1) / paramValue) + 1;

                if (newPage > 1) {
                    paramData[this.options.page] = newPage;
                } else {
                    delete paramData[this.options.page];
                }
            }

            paramData[paramName] = paramValue;

            if (this.options.post) {
                form = document.createElement('form');
                params = [this.options.mode, this.options.direction, this.options.order, this.options.limit];

                for (key in paramData) {
                    if (params.indexOf(key) !== -1) { //eslint-disable-line max-depth
                        input = document.createElement('input');
                        input.name = key;
                        input.value = paramData[key];
                        form.appendChild(input);
                        delete paramData[key];
                    }
                }
                formKey = document.createElement('input');
                formKey.name = 'form_key';
                formKey.value = this.options.formKey;
                form.appendChild(formKey);

                paramData = $.param(paramData);
                baseUrl += paramData.length ? '?' + paramData : '';

                form.action = baseUrl;
                form.method = 'POST';
                document.body.appendChild(form);
                form.submit();
            } else {
                if (paramValue === defaultValue.toString()) {
                    delete paramData[paramName];
                }
                paramData = Object.keys(paramData).map(function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(paramData[k])
                }).join('&');

                location.href = baseUrl + (paramData.length ? '?' + paramData : '');
            }
        },
        filters: false,
        filterBtnText: 'Hide Filters',
        hideBtn: !(document.querySelector(".filter-content") || document.querySelector("#narrow-by-list2")),
        toggleFilters() {
            var cols = document.querySelector(".columns");

            var left_col = document.querySelector(".sidebar");
            if (!this.filters) {
                cols.style.display = "block";
                left_col.style.display = "none";
            } else {
                cols.style.display = null;
                left_col.style.display = null;

            }
            this.filters = !this.filters;
            this.filterBtnText = this.filters ? 'Show Filters' : 'Hide Filters';

        }
    }
}
