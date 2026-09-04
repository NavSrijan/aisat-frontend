import { QuizManifest } from '@/types/aisat';

export const SAMPLE_AISAT_QUIZ: QuizManifest = {
  id: 'aisat-2026-general',
  title: 'All India Scholarship & Assessment Test (AISAT 2026)',
  subtitle: 'National Technical Aptitude & Core Engineering Benchmark',
  code: 'AISAT-NAT-2026',
  totalDurationMinutes: 45,
  totalMarks: 100,
  instructions: [
    'The assessment contains 3 sections with distinct difficulty levels and question interaction types.',
    'You can navigate freely between questions and sections before final submission.',
    'Your responses are automatically saved in real time.',
    'Do not refresh or close the browser window during the active test session.',
    'Calculators are permitted for numerical calculation questions.',
  ],
  sections: [
    {
      id: 'sec-aptitude',
      title: 'Quantitative & Analytical Aptitude',
      description: 'Logical reasoning, data interpretation, probability, and numerical calculations.',
      durationMinutes: 15,
      questionIds: ['q1', 'q2', 'q3'],
    },
    {
      id: 'sec-core-cs',
      title: 'Core Engineering & Computing Fundamentals',
      description: 'Data structures, algorithms, operating systems, networking, and DBMS.',
      durationMinutes: 15,
      questionIds: ['q4', 'q5', 'q6', 'q7'],
    },
    {
      id: 'sec-coding',
      title: 'Practical Coding & Algorithmic Problem Solving',
      description: 'Hands-on programming logic, test case execution, and syntax accuracy.',
      durationMinutes: 15,
      questionIds: ['q8'],
    },
  ],
  questions: [
    // 1. MCQ Single Correct
    {
      id: 'q1',
      sectionId: 'sec-aptitude',
      type: 'MCQ_SINGLE',
      title: 'Probability & Permutations',
      prompt: 'A bag contains 5 red, 4 blue, and 3 green marbles. Two marbles are drawn at random without replacement. What is the probability that both drawn marbles are of the same color?',
      marks: 4,
      negativeMarks: 1,
      options: [
        { id: 'opt-a', text: '19 / 66' },
        { id: 'opt-b', text: '23 / 66' },
        { id: 'opt-c', text: '5 / 22' },
        { id: 'opt-d', text: '7 / 33' },
      ],
      explanationHint: 'Calculate combinations for choosing 2 red (5C2), 2 blue (4C2), and 2 green (3C2), then divide by total pairs (12C2 = 66).',
    },
    // 2. Numeric Input
    {
      id: 'q2',
      sectionId: 'sec-aptitude',
      type: 'NUMERIC',
      title: 'Work, Rate & Time Calculation',
      prompt: 'Pipe A can fill a tank in 12 hours, while Pipe B can fill it in 18 hours. If Pipe C can empty the full tank in 24 hours and all three pipes are opened simultaneously into an empty tank, how many hours will it take to fill the tank completely? (Enter decimal value rounded to 2 decimal places)',
      marks: 4,
      numericTolerance: 0.1,
      numericUnit: 'Hours',
      explanationHint: 'Net rate = 1/12 + 1/18 - 1/24 = (6 + 4 - 3)/72 = 7/72 tank per hour. Total time = 72/7 ≈ 10.29 hours.',
    },
    // 3. Match Columns
    {
      id: 'q3',
      sectionId: 'sec-aptitude',
      type: 'MATCH_COLUMNS',
      title: 'Data Representation & Series Patterns',
      prompt: 'Match each numeric sequence with its governing closed-form recursive rule:',
      marks: 4,
      matchPairs: {
        leftItems: [
          { id: 'left-1', text: 'A. 2, 6, 12, 20, 30...' },
          { id: 'left-2', text: 'B. 1, 8, 27, 64, 125...' },
          { id: 'left-3', text: 'C. 3, 7, 15, 31, 63...' },
          { id: 'left-4', text: 'D. 0, 1, 1, 2, 3, 5, 8...' },
        ],
        rightItems: [
          { id: 'right-1', text: '1. Perfect Cubes (n³)' },
          { id: 'right-2', text: '2. Pronic Numbers (n² + n)' },
          { id: 'right-3', text: '3. Fibonacci Recurrence (Fₙ = Fₙ₋₁ + Fₙ₋₂)' },
          { id: 'right-4', text: '4. Exponential Shift (2ⁿ⁺¹ - 1)' },
        ],
      },
    },
    // 4. MCQ Multi Correct
    {
      id: 'q4',
      sectionId: 'sec-core-cs',
      type: 'MCQ_MULTI',
      title: 'Operating Systems & Concurrency',
      prompt: 'Which of the following conditions MUST simultaneously hold true for a deadlock to occur in a multi-threaded OS environment? (Select all that apply)',
      marks: 4,
      negativeMarks: 1,
      options: [
        { id: 'opt-1', text: 'Mutual Exclusion (resources cannot be shared concurrently)' },
        { id: 'opt-2', text: 'Hold and Wait (processes holding resources can request new ones)' },
        { id: 'opt-3', text: 'Preemptive Scheduling (OS forcefully revokes resources)' },
        { id: 'opt-4', text: 'No Preemption (resources are released only voluntarily by holder)' },
        { id: 'opt-5', text: 'Circular Wait (a closed loop of processes waiting for each other)' },
      ],
    },
    // 5. Fill in the Blanks
    {
      id: 'q5',
      sectionId: 'sec-core-cs',
      type: 'FILL_IN_BLANKS',
      title: 'Database Transactions (ACID)',
      prompt: 'In relational database theory, the ACID property of [blank_1] ensures that all database operations in a transaction succeed completely or none do. The property of [blank_2] ensures that concurrently executing transactions do not interfere with each other.',
      marks: 4,
      blanksCount: 2,
    },
    // 6. Short Answer
    {
      id: 'q6',
      sectionId: 'sec-core-cs',
      type: 'SHORT_ANSWER',
      title: 'System Architecture & Caching Strategy',
      prompt: 'Explain the fundamental difference between a Write-Through and a Write-Back cache strategy, highlighting how each impacts data consistency and write latency.',
      marks: 4,
    },
    // 7. Match Columns (Data Structures)
    {
      id: 'q7',
      sectionId: 'sec-core-cs',
      type: 'MATCH_COLUMNS',
      title: 'Algorithm Complexities',
      prompt: 'Match each standard operation with its tight worst-case time complexity:',
      marks: 4,
      matchPairs: {
        leftItems: [
          { id: 'ds-1', text: 'A. Binary Search in Sorted Array' },
          { id: 'ds-2', text: 'B. Lookup in Balanced AVL Tree' },
          { id: 'ds-3', text: 'C. Deletion in Hash Table (Worst Case)' },
          { id: 'ds-4', text: 'D. Merge Sort on N Elements' },
        ],
        rightItems: [
          { id: 'tc-1', text: '1. O(log N)' },
          { id: 'tc-2', text: '2. O(N log N)' },
          { id: 'tc-3', text: '3. O(N)' },
          { id: 'tc-4', text: '4. O(1) Amortized' },
        ],
      },
    },
    // 8. Coding Challenge
    {
      id: 'q8',
      sectionId: 'sec-coding',
      type: 'CODING_CHALLENGE',
      title: 'Two Sum II - Input Array Is Sorted',
      prompt: `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.

Return the indices of the two numbers, [index1, index2], as an integer array of length 2 where 1 <= index1 < index2 <= numbers.length.

Your solution must use only O(1) additional memory space.`,
      marks: 20,
      starterCode: {
        python: `def twoSum(numbers: list[int], target: int) -> list[int]:
    # Write your O(1) space two-pointer solution here
    left = 0
    right = len(numbers) - 1
    
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return []
`,
        javascript: `function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
}
`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0;
        int right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return {left + 1, right + 1};
            else if (sum < target) left++;
            else right--;
        }
        return {};
    }
};
`,
      },
      testCases: [
        { id: 'tc-1', input: 'numbers = [2,7,11,15], target = 9', expectedOutput: '[1, 2]', isPublic: true },
        { id: 'tc-2', input: 'numbers = [2,3,4], target = 6', expectedOutput: '[1, 3]', isPublic: true },
        { id: 'tc-3', input: 'numbers = [-1,0], target = -1', expectedOutput: '[1, 2]', isPublic: true },
      ],
    },
  ],
};
