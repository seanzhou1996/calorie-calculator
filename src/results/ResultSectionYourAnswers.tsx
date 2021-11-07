import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { I18nKeys } from 'shared/i18n-keys';
import {
  activityLabelI18nKeys,
  goalLabelI18nKeys,
  PersonInfo,
  RoutePath,
  sexI18nKeys,
  SummaryListRow,
} from 'shared/models';
import BaseSummaryList from 'shared/BaseSummaryList';

interface ResultSectionYourAnswersProps {
  personInfo: PersonInfo;
}

export default function ResultSectionYourAnswers({
  personInfo: { age, sex, height, weight, activityLevel, goal },
}: ResultSectionYourAnswersProps) {
  const { t } = useTranslation();
  const history = useHistory();

  const summaryListData: SummaryListRow[] = [
    {
      key: `1. ${t(I18nKeys.PersonalDetails)}`,
      value: (
        <ul className="personal-info-list">
          <li>
            {t(I18nKeys.Age)}: {age}
          </li>
          <li>
            {t(I18nKeys.Sex)}: {t(sexI18nKeys[sex])}
          </li>
          <li>
            {t(I18nKeys.Height)}: {height} cm
          </li>
          <li>
            {t(I18nKeys.Weight)}: {weight} kg
          </li>
        </ul>
      ),
      // action: {
      //   name: t(I18nKeys.Change),
      //   callback: () => history.push(RoutePath.PersonalDetails),
      // },
    },
    {
      key: `2. ${t(I18nKeys.ActivityPageTitle)}`,
      value: t(activityLabelI18nKeys[activityLevel]),
      // action: {
      //   name: t(I18nKeys.Change),
      //   callback: () => history.push(RoutePath.ActivityLevel),
      // },
    },
    {
      key: `3. ${t(I18nKeys.GoalPageTitle)}`,
      value: t(I18nKeys.ToAchieveGoal_goal, { goal: t(goalLabelI18nKeys[goal]) }),
      // action: {
      //   name: t(I18nKeys.Change),
      //   callback: () => history.push(RoutePath.FitnessGoal),
      // },
    },
  ];

  return (
    <section className="page-section">
      <header>{t(I18nKeys.AnswersTitle)}</header>
      <button
        onClick={() => {
          history.push(RoutePath.Home);
        }}
        className="start-again-button"
      >
        <span>{t(I18nKeys.StartAgain)}</span>
      </button>
      <BaseSummaryList data={summaryListData} />
    </section>
  );
}
