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
      <div className="calorie-checker__collapse-override">
        <Collapse ghost collapsible="disabled" activeKey={allFoodTypes}>
          {allFoodTypes.map((foodType) => (
            <Panel header={null} key={foodType} showArrow={false}>
              <div className="food-list-panel">
                <h2 className="food-list-panel__label">{t(foodTypeI18nKeys[foodType])}</h2>
                <div className="food-list-panel__list">
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
                <div className="back-to-top">
                  <div className="width-container">
                    <a href={`#${foodType}`} className="back-to-top__link">
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
