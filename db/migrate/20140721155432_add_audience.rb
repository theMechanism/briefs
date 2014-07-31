class AddAudience < ActiveRecord::Migration
  def change
  	create_table :audiences do |t|
      t.string :description
      t.integer :brief_id

      t.timestamps
    end
  end
end
