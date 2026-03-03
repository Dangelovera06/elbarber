exports.handler = async (event, context) => {
  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the form data
    const formData = new URLSearchParams(event.body);
    const data = Object.fromEntries(formData.entries());
    
    // Extract individual fields for easier processing
    const processedData = {
      // Contact Info
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      business: data.business || '',
      
      // Individual Quiz Questions
      question_1_business_type: data.question_1_business_type || '',
      question_2_monthly_customers: data.question_2_monthly_customers || '',
      question_3_biggest_challenge: data.question_3_biggest_challenge || '',
      question_4_current_marketing: data.question_4_current_marketing || '',
      question_5_marketing_budget: data.question_5_marketing_budget || '',
      question_6_primary_goal: data.question_6_primary_goal || '',
      question_7_contact_preference: data.question_7_contact_preference || '',
      
      // Metadata
      quiz_completion_date: data.quiz_completion_date || new Date().toISOString(),
      growth_score: data.growth_score || '',
      potential_increase: data.potential_increase || '',
      
      // Timestamp
      processed_at: new Date().toISOString()
    };

    // Log the data for debugging
    console.log('Quiz submission received:', processedData);
    
    // Here you could:
    // 1. Send to Google Sheets directly
    // 2. Send to Zapier webhook
    // 3. Store in a database
    // 4. Send email notifications
    
    // For now, just return success
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Quiz data processed successfully',
        data: processedData
      })
    };
    
  } catch (error) {
    console.error('Error processing quiz submission:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to process quiz submission'
      })
    };
  }
};
