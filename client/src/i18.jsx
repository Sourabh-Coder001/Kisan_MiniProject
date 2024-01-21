import i18 from 'i18next';
import {initReactI18next}  from 'react-i18next';
import Common_en from '../src/Components/Translation/eng.json';
import Common_hindi from '../src/Components/Translation/hindi.json';
import Common_mar from '../src/Components/Translation/mar.json';
import { common } from '@mui/material/colors';
import i18next from 'i18next';

const resouces={
    en:{
        translation:Common_en
    },
    hindi:{
        translation:Common_hindi
    },
    mar:{
        translation:Common_mar
    }
}
i18next.use(initReactI18next)
.init({
    resouces,
    lng:'en',
    keySparator:false,
    interpolation:{
        escapeValue:false
    }
});

export default i18;