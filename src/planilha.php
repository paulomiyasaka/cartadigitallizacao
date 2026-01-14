<?php
<<<<<<< HEAD:controle/planilha.php
require 'vendor/autoload.php';
=======
namespace Carta;
>>>>>>> origin/main:src/planilha.php

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;	
/**
 * 
 */
class planilha
{
	


	public function ler($planilha){

		try {

		    $reader = new Xlsx();
		    $reader->setReadDataOnly(true);
		    $spreadsheet = $reader->load($planilha);

		    $sheet = $spreadsheet->getActiveSheet();

		    // Método simples: toArray
		    $rows = $sheet->toArray(null, true, true, true);

		    // Get the highest row and column that actually contain data
		    $highestRow = $sheet->getHighestDataRow(); // e.g., 10
		    $highestColumn = $sheet->getHighestDataColumn(); // e.g., 'F'

		    // Create the specific cell range using the determined boundaries
		    // The range starts from 'A1' and goes up to the highest data column and row found
		    $range = 'A1:' . $highestColumn . $highestRow;

		    // Pass the precise range to rangeToArray() to get only the relevant data
		    $data = $sheet->rangeToArray(
		        $range,
		        NULL,      // Value that should be returned for empty cells
		        TRUE,      // Should formulas be calculated?
		        FALSE,     // Should the array be indexed by cell row and column?
		        FALSE      // Should the array ignore the first column?
		    );
		    
		    return $data;


		} catch (\Throwable $e) {
		    //echo 'Erro ao ler a planilha: ' . $e->getMessage();
		    //return 'Erro ao ler a planilha: ' . $e->getMessage();
		    return false;
		    //exit;
		}

		


	}


}



?>