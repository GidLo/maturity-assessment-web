
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { AssessmentResults } from '@/types/assessment';

interface ResultsTableProps {
  results: AssessmentResults;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <Table>
      <TableCaption>Assessment Results Summary</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Competency</TableHead>
          <TableHead className="text-right">Score</TableHead>
          <TableHead className="text-right">Max Score</TableHead>
          <TableHead className="text-right">Average (out of 5)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.competencies.map((comp) => {
          const averageScore = (comp.score / comp.maxScore) * 5;
          return (
            <TableRow key={comp.name}>
              <TableCell className="font-medium">{comp.name}</TableCell>
              <TableCell className="text-right">{comp.score}</TableCell>
              <TableCell className="text-right">{comp.maxScore}</TableCell>
              <TableCell className="text-right">{averageScore.toFixed(1)}</TableCell>
            </TableRow>
          );
        })}
        <TableRow className="bg-muted/50 font-medium">
          <TableCell className="font-bold">OVERALL</TableCell>
          <TableCell className="text-right font-bold">{results.overallScore}</TableCell>
          <TableCell className="text-right font-bold">{results.maxPossibleScore}</TableCell>
          <TableCell className="text-right font-bold">
            {((results.overallScore / results.maxPossibleScore) * 5).toFixed(1)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ResultsTable;
