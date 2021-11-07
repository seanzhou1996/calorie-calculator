import React, { useEffect, useState } from 'react';
import { allFoodTypes, Food, foodTypeI18nKeys, I18nNamespace } from 'shared/models';
import { listFoodCalories } from 'services/calorie-checker-service';
import CalorieCheckerFood from './CalorieCheckerFood';
import { useTranslation } from 'react-i18next';
import { I18nKeys as CommonI18nKeys, CalorieCheckerI18nKeys as I18nKeys } from 'shared/i18n-keys';
import BaseGoBackButton from 'shared/BaseGoBackButton';

const { Panel } = Collapse;

export default function CalorieChecker() {
  const { t } = useTranslation(I18nNamespace.CalorieChecker);
  const [foodArray, setFoodArray] = useState<Food[]>([]);

  useEffect(() => {
    listFoodCalories().then((arr) => setFoodArray(arr));
  }, []);

  return (
    <div>
      <div className="width-container">
        <BaseGoBackButton
          to={RoutePath.Results}
          titleOverride={t(CommonI18nKeys.GoBackToResults)}
        />
        <h1>{t(I18nKeys.Title)}</h1>
        <p>{t(I18nKeys.Intro)}</p>
        <ul className="calorie-checker__nav-list">
          {allFoodTypes.map((foodType) => (
            <li key={foodType} className="calorie-checker__nav-item">
              <a href={`#${foodType}`} className="calorie-checker__nav-link">
                {t(foodTypeI18nKeys[foodType])}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="calorie-checker__collapse-override">
        <Collapse ghost collapsible="disabled" activeKey={allFoodTypes}>
          {allFoodTypes.map((foodType) => (
            <Panel header={null} key={foodType} showArrow={false}>
              <div className="food-list-panel">
                <h2 id={foodType} className="food-list-panel__label">
                  {t(foodTypeI18nKeys[foodType])}
                </h2>
                <div className="food-list-panel__list">
                  {foodArray
                    .filter(({ type }) => type === foodType)
                    .map((food) => (
                      <div key={food.name} className="food-list-panel__item">
                        <div className="width-container">
                          <CalorieCheckerFood food={food} />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="back-to-top">
                  <div className="width-container">
                    <a href="#calorie_checker_title" className="back-to-top__link">
                      <ArrowUpOutlined className="back-to-top__arrow" />
                      <span>{t(CommonI18nKeys.BackToTop)}</span>
                    </a>
                  </div>
                </div>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}
