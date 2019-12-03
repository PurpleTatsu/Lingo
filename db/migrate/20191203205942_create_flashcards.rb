class CreateFlashcards < ActiveRecord::Migration[6.0]
  def change
    create_table :flashcards do |t|
      t.string :vocab
      t.string :vocab2
      t.string :vocab3
      t.text :description

      t.timestamps
    end
  end
end
