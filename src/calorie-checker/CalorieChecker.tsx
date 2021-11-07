import React, { useEffect, useState } from 'react';
import { Collapse, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { allFoodTypes, Food, foodTypeI18nKeys, I18nNamespace, RoutePath } from 'shared/models';
import { listFoodCalories } from 'services/calorie-checker-service';
import CalorieCheckerFood from './CalorieCheckerFood';
import { I18nKeys as CommonI18nKeys, CalorieCheckerI18nKeys as I18nKeys } from 'shared/i18n-keys';
import BaseGoBackButton from 'shared/BaseGoBackButton';
import BaseBackToTopButton from 'shared/BaseBackToTopButton';

const { Panel } = Collapse;

export default function CalorieChecker() {
  const { t } = useTranslation(I18nNamespace.CalorieChecker);
  const [foodArray, setFoodArray] = useState<Food[]>([]);

  const init = () => listFoodCalories().then((arr) => setFoodArray(arr));

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="width-container">
        <BaseGoBackButton
          to={RoutePath.Results}
          titleOverride={t(CommonI18nKeys.GoBackToResults)}
        />
        <h1 id="page_title">{t(I18nKeys.Title)}</h1>
      </div>
      {foodArray.length === 0 ? (
        <div className="spinner-wrapper">
          <span>{t(CommonI18nKeys.Loading)}</span>
          <Spin indicator={<LoadingOutlined className="spinner" spin />} size="default" />
        </div>
      ) : (
        <>
          <div className="width-container">
            <p>{t(I18nKeys.Intro)}</p>
            <ul id="calorie-checker_nav_list" className="calorie-checker__nav-list">
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
                        <BaseBackToTopButton href="#page_title" />
                      </div>
                    </div>
                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>
        </>
      )}
    </div>
  );
}
