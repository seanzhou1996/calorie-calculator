import React, { useEffect, useState } from 'react';
import { allFoodTypes, Food, foodTypeI18nKeys, I18nNamespace } from 'shared/models';
import { listFoodCalories } from 'services/calorie-checker-service';
import CalorieCheckerListItem from './CalorieCheckerListItem';
import { useTranslation } from 'react-i18next';
import { I18nKeys as CommonI18nKeys, CalorieCheckerI18nKeys as I18nKeys } from 'shared/i18n-keys';
import { Collapse } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

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
        <h1>{t(I18nKeys.Title)}</h1>
      </div>
      <div className="food-expanders">
        <Collapse ghost collapsible="header" onChange={(key) => console.log(key)}>
          {allFoodTypes.map((foodType) => (
            <Panel
              header={
                <div id={foodType} className="food-expander-header">
                  <div className="width-container">
                    <div className="food-expander-header-inner">
                      <span>{t(foodTypeI18nKeys[foodType])}</span>
                      <span className="expander-icon-wrapper">
                        <PlusOutlined className="expander-icon expander-icon__open" />
                        <MinusOutlined className="expander-icon expander-icon__collapse" />
                      </span>
                    </div>
                  </div>
                </div>
              }
              key={foodType}
              showArrow={false}
              className="food-expander-panel"
            >
              <div className="food-expander-content">
                <div className="food-list">
                  {foodArray
                    .filter(({ type }) => type === foodType)
                    .map((food) => (
                      <div key={food.name} className="food-list-item">
                        <div className="width-container">
                          <CalorieCheckerListItem food={food} />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="food-expander-action">
                  <div className="width-container">
                    <a href={`#${foodType}`} className="back-to-top-button">
                      {t(CommonI18nKeys.BackToTop)}
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
