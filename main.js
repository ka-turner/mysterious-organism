// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Creates a pAequor object instance
function pAequorFactory(uniqueNumber, basesArray) {
  return {
    specimenNum: uniqueNumber, 
    dna: basesArray,
    //changes 1 random DNA base
    mutate() {
      let randomBase;
      let currentValue;
      let newValue;
      do {
        randomBase = Math.floor(Math.random() * 15)
        currentValue = this.dna[randomBase] 
        newValue = returnRandBase() 
      } while (currentValue == newValue)
      this.dna[randomBase] = newValue
    },
    //Prints % of similarity between 2 pAequor objects. The DNA needs to be the same at the same location in the DNA array
    compareDNA(pAequorObject) {
      let sameDNA = [];
      for (let j = 0; j < this.dna.length; j++) {
        for (let k = 0; k < pAequorObject.dna.length; k++) {
          if (this.dna[j] === pAequorObject.dna[k] && j == k) {
            sameDNA.push('Same')
          }
        }
      }
      let percentage = sameDNA.length / 15 * 100
      console.log(`Specimen #${this.specimenNum} and Specimen #${pAequorObject.specimenNum} have ${percentage}% in common.`)
    },
    //Returns true if at least 60% of DNA are C or G
    willLikelySurvive () {
      let CGBases = [];
      for (let n = 0; n < this.dna.length ; n++) {
        if (this.dna[n] == 'C' || this.dna[n] == 'G') {
          CGBases.push(this.dna[n])
        }
      }
      let percentage = CGBases.length / 15 * 100
      if (percentage >= 60) {
        return true
      } else {
        return false
      }
    }
  }
}

//Stores 30 instances of the pAequor object where willLikelySurvive is true
let pAequorArray = [];
let num = 1
do {
  
  let pAequorItem = pAequorFactory(num, mockUpStrand());
  if (pAequorItem.willLikelySurvive() == true) {
    pAequorArray.push(pAequorItem)
    num++
  }
  
} while (pAequorArray.length < 30)

//Prints array with 30 instances of pAequor objects that are likely to survive
console.log(pAequorArray);









