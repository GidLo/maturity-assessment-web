import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import SpiderChart from '@/components/SpiderChart';
import ResultsTable from '@/components/ResultsTable';
import { useAssessment } from '@/context/AssessmentContext';
import { Download, Share2, RefreshCw, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Initialize Supabase client with null checking
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create the client if both URL and key are available
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const Results = () => {
  const navigate = useNavigate();
  const { results, isComplete } = useAssessment();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Redirect to assessment if no results
  useEffect(() => {
    if (!results && !isComplete) {
      navigate('/assessment');
    }
  }, [results, isComplete, navigate]);

  if (!results) {
    return null;
  }

  const overallPercentage = (results.overallScore / results.maxPossibleScore) * 100;
  const overallAverage = results.overallScore / (results.maxPossibleScore / 5);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Function to generate and download CSV
  const downloadExcelReport = () => {
    // Create CSV header
    const headers = ['Competency', 'Score', 'Max Score', 'Average (out of 5)'];
    const csvRows = [headers];
    
    // Add data for each competency - wrap names in quotes to handle commas
    results.competencies.forEach((comp) => {
      const averageScore = (comp.score / comp.maxScore) * 5;
      csvRows.push([
        `"${comp.name}"`, // Wrap competency name in quotes to handle commas
        comp.score.toString(),
        comp.maxScore.toString(),
        averageScore.toFixed(1)
      ]);
    });
    
    // Add overall score - wrap "OVERALL" in quotes for consistency
    csvRows.push([
      '"OVERALL"',
      results.overallScore.toString(),
      results.maxPossibleScore.toString(),
      overallAverage.toFixed(1)
    ]);
    
    // Convert to CSV string
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'procurement_maturity_assessment.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to save results to Supabase
  const saveResultsToSupabase = async () => {
    if (isSaved) {
      toast({
        title: "Already saved",
        description: "This assessment result has already been saved to the database.",
      });
      return;
    }

    // Check if Supabase client is available
    if (!supabase) {
      toast({
        title: "Configuration Error",
        description: "Supabase credentials are not properly configured. Please contact the administrator.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);

    try {
      // Create the data object for Supabase
      const resultData = {
        completed_at: results.completedAt,
        overall_score: results.overallScore,
        max_possible_score: results.maxPossibleScore,
        overall_average: overallAverage.toFixed(1),
        competencies: results.competencies.map(comp => ({
          name: comp.name,
          score: comp.score,
          max_score: comp.maxScore,
          average: ((comp.score / comp.maxScore) * 5).toFixed(1)
        }))
      };

      // Insert data into Supabase
      const { error } = await supabase
        .from('assessment_results')
        .insert([resultData]);

      if (error) {
        console.error('Error saving to Supabase:', error);
        toast({
          title: "Error",
          description: "Failed to save assessment results to database.",
          variant: "destructive"
        });
      } else {
        setIsSaved(true);
        toast({
          title: "Success",
          description: "Assessment results saved to database successfully.",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving results.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-16">
        <div className="container max-w-5xl px-4 py-12 md:py-16">
          <motion.div 
            className="text-center mb-12 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-medium">Your Maturity Assessment Results</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's a breakdown of your strengths across six key competencies
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2 glass-card rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-medium">Competency Profile</h2>
              </div>
              <div className="p-6">
                <SpiderChart data={results.competencies} />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-medium">Overall Score</h2>
                </div>
                <div className="p-6 text-center">
                  <div className="inline-flex items-center justify-center rounded-full size-32 border-4 border-primary/20">
                    <div className="text-3xl font-semibold">
                      {overallAverage.toFixed(1)}/5
                    </div>
                  </div>
                  <div className="mt-4 text-muted-foreground">
                    Average maturity level
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-medium">Competency Breakdown</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {results.competencies
                      .sort((a, b) => (b.score/b.maxScore) - (a.score/a.maxScore))
                      .map((competency) => {
                        // Calculate average on 5-point scale
                        const averageScore = (competency.score / competency.maxScore) * 5;
                        return (
                          <li key={competency.name} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{competency.name}</span>
                              <span>{averageScore.toFixed(1)}/5</span>
                            </div>
                            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${competency.percentage}%` }}
                              />
                            </div>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={downloadExcelReport}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-input bg-background hover:bg-secondary"
                >
                  <Download className="size-4" />
                  <span>Download Excel Report</span>
                </button>
                
                <button 
                  onClick={saveResultsToSupabase}
                  disabled={isSaving || isSaved || !supabase}
                  className={`inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-input ${
                    !supabase 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : isSaved 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100 cursor-default' 
                        : 'bg-background hover:bg-secondary'
                  }`}
                >
                  <Save className="size-4" />
                  <span>
                    {!supabase 
                      ? 'Supabase Not Configured' 
                      : isSaving 
                        ? 'Saving...' 
                        : isSaved 
                          ? 'Saved to Database' 
                          : 'Save to Database'
                    }
                  </span>
                </button>
                
                <button className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-input bg-background hover:bg-secondary">
                  <Share2 className="size-4" />
                  <span>Share Results</span>
                </button>
                
                <button 
                  onClick={() => navigate('/')}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <RefreshCw className="size-4" />
                  <span>Start New Assessment</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="mt-12 glass-card rounded-xl overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-medium">Detailed Results</h2>
            </div>
            <div className="p-6 overflow-auto">
              <ResultsTable results={results} />
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Results;
