import React from 'react';
import { makeAutoObservable, toJS } from "mobx";
import PlayersTypes from '../utils/playersTypes';

export default class Store {
  isFinished = false;
  currentPlayer = PlayersTypes.CROSS;
  fields = [
      {
          player: '',
          value: false
      },
      {
          player: '',
          value: false
      },
      {
          player: '',
          value: false
      },
      {
          player: '',
          value: false
      },
      {
          player: '',
          value: false
      },
      {
          player: '',
          value: false
      },
      {
          player: '',
          value: false
      },
      {
          player: '',
          value: false
      },
      {
          player: '',
          value: false
      },
  ];

  constructor() {
    makeAutoObservable(this)
  }

  get winnerObj() {
      const ruleHorizontal = (fields, player) => {
        let matchArray = [];
  
        fields.forEach((item, index) => {
          const isNotСompleteMatchArray = matchArray.length < 3;
          const isEmptyMatchArray = !matchArray.length;
          const isSelectedPlayerField = item.player === player && item.value === true;
          const isStepDifference = index - matchArray[matchArray.length - 1] === 1;
  
          if (isNotСompleteMatchArray) {
            if (isEmptyMatchArray) {
              if (isSelectedPlayerField) {
                matchArray.push(index)
              }
            } else {
              if (isSelectedPlayerField && isStepDifference) {
                  matchArray.push(index)
                } else {
                  matchArray = [];
                }
            }
  
          }
        })
  
        const lastMatchArrayElem = matchArray[matchArray.length - 1];
        const isSingleRowMatch = (lastMatchArrayElem + 1) % 3 === 0;

        if (isSingleRowMatch && matchArray.length > 2) {
          return matchArray;
        } else {
          return false;
        }
      };
  
      const ruleVertical = (fields, player) => {
        let matchArray = [];
        const slicedFields = fields.slice(0, 3)
  
        slicedFields.forEach((item, index) => {
          const isNotСompleteMatchArray = matchArray.length < 3;
          const isSelectedPlayerField = item.player === player && item.value === true;
          
          if (isNotСompleteMatchArray && isSelectedPlayerField) {
              const secondVerticalAvalible = fields[index + 3].value && fields[index + 3].player  === player;
              const thirdVerticalAvalible = fields[index + 6].value && fields[index + 6].player  === player;
              if (secondVerticalAvalible && thirdVerticalAvalible) {
                matchArray = [index, index + 3, index + 6]
              }
  
          }
        })
        if (matchArray.length > 2 ) {
          return matchArray;
        } else {
          return false;
        }
      };
  
      const ruleDiagonalLeft = (fields, player) => {
        const isSelectedPlayerField = fields[0].player === player && fields[0].value === true;
        const secondDiagonalAvalible = fields[4].value && fields[4].player === player;
        const thirdDiagonalAvalible = fields[8].value && fields[8].player === player;
        if (isSelectedPlayerField) {
          if (secondDiagonalAvalible && thirdDiagonalAvalible) {
            return [0, 4, 8]
          } else {
            return []
          }
        } else {
          return false
        }
      };
      
      const ruleDiagonalRight = (fields, player) => {
        const isSelectedPlayerField = fields[2].player === player && fields[2].value === true;
        const secondDiagonalAvalible = fields[4].value && fields[4].player === player;
        const thirdDiagonalAvalible = fields[6].value  && fields[6].player === player;
        
        if (isSelectedPlayerField && secondDiagonalAvalible && thirdDiagonalAvalible) {
          return [2, 4, 6]
        } else {
          return false
        }
      };

      const crossArray =
        ruleHorizontal(this.fields, PlayersTypes.CROSS)
        || ruleVertical(this.fields, PlayersTypes.CROSS)
        || ruleDiagonalLeft(this.fields, PlayersTypes.CROSS)
        || ruleDiagonalRight(this.fields, PlayersTypes.CROSS);
      const zeroArray =
        ruleHorizontal(this.fields, PlayersTypes.ZERO)
        || ruleVertical(this.fields, PlayersTypes.ZERO)
        || ruleDiagonalLeft(this.fields, PlayersTypes.ZERO)
        || ruleDiagonalRight(this.fields, PlayersTypes.ZERO);


      if (crossArray.length) {
        return {
          player: PlayersTypes.CROSS,
          fields: crossArray
        }
      } else if (zeroArray.length) {
        return {
          player: PlayersTypes.ZERO,
          fields: zeroArray
        }
      } else {
        return null
      }
  }

  setFields(newFields) {
    this.fields = newFields;
  }

  setCurrentPlayer(player) {
      this.currentPlayer = player;
  }

  reset() {
    this.isFinished = false;
    this.currentPlayer = PlayersTypes.CROSS;
    this.fields = [
        {
            player: '',
            value: false
        },
        {
            player: '',
            value: false
        },
        {
            player: '',
            value: false
        },
        {
            player: '',
            value: false
        },
        {
            player: '',
            value: false
        },
        {
            player: '',
            value: false
        },
        {
            player: '',
            value: false
        },
        {
            player: '',
            value: false
        },
        {
            player: '',
            value: false
        },
    ];
  };
};

const StoreContext = React.createContext();
 
export const StoreProvider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
 
/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);