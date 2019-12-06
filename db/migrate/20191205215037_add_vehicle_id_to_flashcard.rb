class AddVehicleIdToFlashcard < ActiveRecord::Migration[6.0]
  def change
    add_reference :flashcards, :vehicle, null: false, foreign_key: true
  end
end
