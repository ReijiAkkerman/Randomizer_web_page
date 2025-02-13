class Lists {
    static selectors = new Map([
        /**
         * Отсюда работа с самим списком отображаемым 
         * на основной рабочей области 
         */

        ['Область с типом отображаемых слов', '.words_section-type'],
    ]);





    static showed_words_type;
    static hidden_words_type;





    /**
     * Отсюда работа с самим списком отображаемым 
     * на основной рабочей области 
     */

    static words_type__areas = document.querySelectorAll(Lists.selectors.get('Область с типом отображаемых слов'));




    /**
     * Отсюда работа с самим списком отображаемым 
     * на основной рабочей области 
     */

    static define_words_type() {
        
    }
}